import sys
from ruamel.yaml import YAML

environment = 'preprod'

# Gets environment index from environment name
def getEnvironmentIndex(environments, name):
    environmentIndex = 0
    for environment in environments:
        if environment['environment'] == name:
            return environmentIndex

        environmentIndex += 1

    return -1


# Main
prefix = str(sys.argv[1])
newTag = str(sys.argv[2])

inp_radixconfig = open("radixconfig.yaml").read()
yaml = YAML()
content = yaml.load(inp_radixconfig)

# Set newTag for selected prefix (web or studio)
componentIndex = 0
for component in content['spec']['components']:
    if component['name'].startswith(prefix):
        environmentIndex = getEnvironmentIndex(content['spec']['components'][componentIndex]['environmentConfig'], environment)
        if environmentIndex > -1:
            content['spec']['components'][componentIndex]['environmentConfig'][environmentIndex]['imageTagname'] = newTag
    componentIndex += 1

outp_radixconfig = open("radixconfig.yaml", "w")
yaml.dump(content, outp_radixconfig)
outp_radixconfig.close()
