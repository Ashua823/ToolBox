import yaml from 'js-yaml'

export function jsonToYaml(json: string): string {
  const parsed = JSON.parse(json)
  return yaml.dump(parsed, { indent: 2, lineWidth: -1 })
}

export function yamlToJson(yamlStr: string): string {
  const parsed = yaml.load(yamlStr)
  return JSON.stringify(parsed, null, 2)
}