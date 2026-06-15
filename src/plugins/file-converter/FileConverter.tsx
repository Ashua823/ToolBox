import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRight, Copy, Download, AlertCircle, FileText } from 'lucide-react'
import { useFileConverterStore } from './store'
import { convert, getOutputFormats, categories, getFormatsByCategory } from './convert'
import { downloadText } from '../../shared/utils/download'

const formatLabels: Record<string, string> = {
  markdown: 'Markdown',
  html: 'HTML',
  json: 'JSON',
  yaml: 'YAML',
  csv: 'CSV',
  text: '纯文本',
  base64: 'Base64',
  urlencode: 'URL 编码',
  hex: 'Hex 十六进制',
  decimal: '十进制',
  binary: '二进制',
  hexnumber: '十六进制数',
  docx: 'Word (.docx)',
  pdf: 'PDF',
}

const extMap: Record<string, string> = {
  markdown: 'md',
  html: 'html',
  json: 'json',
  yaml: 'yaml',
  csv: 'csv',
  text: 'txt',
  base64: 'txt',
  urlencode: 'txt',
  hex: 'txt',
  decimal: 'txt',
  binary: 'txt',
  hexnumber: 'txt',
  docx: 'html',
  pdf: 'txt',
}

export default function FileConverter() {
  const {
    inputText, outputText, inputFormat, outputFormat, activeCategory,
    converting, error,
    setInputText, setOutputText, setInputFormat, setOutputFormat,
    setActiveCategory, setConverting, setError,
  } = useFileConverterStore()

  const [inputFile, setInputFile] = useState<File | null>(null)

  const currentFormats = useMemo(() => getFormatsByCategory(activeCategory), [activeCategory])
  const outputFormats = useMemo(() => getOutputFormats(inputFormat), [inputFormat])
  const isFileInput = useMemo(() => ['docx', 'pdf'].includes(inputFormat), [inputFormat])

  // 切换分类时重置格式
  useEffect(() => {
    const formats = getFormatsByCategory(activeCategory)
    if (formats.length > 0) {
      setInputFormat(formats[0])
      const outs = getOutputFormats(formats[0])
      if (outs.length > 0) {
        setOutputFormat(outs[0])
      }
    }
    setInputText('')
    setOutputText('')
    setInputFile(null)
    setError(null)
  }, [activeCategory, setInputFormat, setOutputFormat, setInputText, setOutputText, setError])

  // 输入格式变化时重置输出格式
  useEffect(() => {
    const outs = getOutputFormats(inputFormat)
    if (outs.length > 0 && !outs.includes(outputFormat)) {
      setOutputFormat(outs[0])
    }
    setInputText('')
    setOutputText('')
    setInputFile(null)
    setError(null)
  }, [inputFormat, outputFormat, setOutputFormat, setInputText, setOutputText, setError])

  const handleFileSelect = useCallback((file: File) => {
    setInputFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(',')[1]
      setInputText(base64)
    }
    reader.readAsDataURL(file)
  }, [setInputText])

  const handleConvert = useCallback(async () => {
    if (!inputText.trim()) return
    setConverting(true)
    setError(null)
    try {
      const result = await convert(inputText, inputFormat, outputFormat)
      setOutputText(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : '转换失败')
      setOutputText('')
    } finally {
      setConverting(false)
    }
  }, [inputText, inputFormat, outputFormat, setConverting, setError, setOutputText])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText)
  }, [outputText])

  return (
    <div className="flex flex-col h-full p-6 gap-4">
      {/* 标题栏 */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-tb-ink">文件格式转换</h2>
      </div>

      {/* 分类选择 */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-tb-accent text-tb-bg'
                : 'bg-tb-bg2 text-tb-muted border border-tb-rule hover:text-tb-ink hover:border-tb-accent'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 分类描述 */}
      <p className="text-xs text-tb-muted -mt-2">
        {categories.find((c) => c.id === activeCategory)?.description}
      </p>

      {/* 格式选择 */}
      <div className="flex items-center gap-3">
        <select
          value={inputFormat}
          onChange={(e) => setInputFormat(e.target.value)}
          className="px-3 py-2 bg-tb-bg2 border border-tb-rule rounded-lg text-tb-ink text-sm focus:outline-none focus:border-tb-accent"
        >
          {currentFormats.map((f) => (
            <option key={f} value={f}>{formatLabels[f] || f}</option>
          ))}
        </select>

        <ArrowRight size={18} className="text-tb-muted" />

        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="px-3 py-2 bg-tb-bg2 border border-tb-rule rounded-lg text-tb-ink text-sm focus:outline-none focus:border-tb-accent"
        >
          {outputFormats.map((f) => (
            <option key={f} value={f}>{formatLabels[f] || f}</option>
          ))}
        </select>

        <button
          onClick={handleConvert}
          disabled={converting || !inputText.trim()}
          className="px-4 py-2 bg-tb-accent text-tb-bg rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          {converting ? '转换中...' : '转换'}
        </button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-800/50 rounded-lg text-red-400 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* 编辑区 */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* 输入区 */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-tb-muted">输入 ({formatLabels[inputFormat]})</span>
            {inputFile && isFileInput && (
              <span className="text-xs text-tb-accent">{inputFile.name}</span>
            )}
          </div>

          {isFileInput ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-tb-bg2 border border-tb-rule border-dashed rounded-lg p-4">
              <input
                type="file"
                accept={inputFormat === 'docx' ? '.docx' : '.pdf'}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileSelect(file)
                }}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="px-4 py-2 bg-tb-bg3 border border-tb-rule rounded-lg text-sm text-tb-ink cursor-pointer hover:border-tb-accent transition-colors"
              >
                {inputFile ? '更换文件' : '选择文件'}
              </label>
              {inputFile && (
                <p className="text-xs text-tb-muted">{inputFile.name} ({(inputFile.size / 1024).toFixed(1)} KB)</p>
              )}
            </div>
          ) : (
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`在此输入 ${formatLabels[inputFormat]} 内容...`}
              className="flex-1 w-full p-4 bg-tb-bg2 border border-tb-rule rounded-lg text-tb-ink text-sm font-mono resize-none focus:outline-none focus:border-tb-accent placeholder:text-tb-muted/50"
            />
          )}
        </div>

        {/* 输出区 */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-tb-muted">输出 ({formatLabels[outputFormat]})</span>
            {outputText && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-tb-accent hover:bg-tb-bg3 rounded transition-colors"
                >
                  <Copy size={14} />
                  复制
                </button>
                <button
                  onClick={() => {
                    const ext = extMap[outputFormat] || outputFormat
                    downloadText(outputText, `converted.${ext}`)
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-tb-accent hover:bg-tb-bg3 rounded transition-colors"
                >
                  <Download size={14} />
                  下载
                </button>
              </div>
            )}
          </div>
          <textarea
            value={outputText}
            readOnly
            placeholder="转换结果将显示在这里..."
            className="flex-1 w-full p-4 bg-tb-bg2 border border-tb-rule rounded-lg text-tb-ink text-sm font-mono resize-none focus:outline-none placeholder:text-tb-muted/50"
          />
        </div>
      </div>
    </div>
  )
}