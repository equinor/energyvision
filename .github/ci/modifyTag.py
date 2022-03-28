import sys
from ruamel.yaml import YAML

prodEnvironment = 'prod'
prodBranch = 'main'

# Gets component index from component name


def getComponentIndex(components, name):
    componentIndex = 0
    for component in components:
        if component['name'] == name:
            return componentIndex

        componentIndex += 1

    return -1

# Gets environment index from environment name


def getEnvironmentIndex(environments, name):
    environmentIndex = 0
    for environment in environments:
        if environment['environment'] == name:
            return environmentIndex

        environmentIndex += 1

    return -1


# Main
component = str(sys.argv[1])
branch = str(sys.argv[2])
newTag = str(sys.argv[3])

inp_radixconfig = open("radixconfig.yaml").read()
yaml = YAML()
content = yaml.load(inp_radixconfig)

# Only prod tag will be dynamic
if branch == prodBranch:
    componentIndex = getComponentIndex(
        content['spec']['components'], component)
    environmentIndex = getEnvironmentIndex(
        content['spec']['components'][componentIndex]['environmentConfig'], prodEnvironment)

    content['spec']['components'][componentIndex]['environmentConfig'][environmentIndex]['imageTagName'] = newTag

    outp_radixconfig = open("radixconfig.yaml", "w")
    yaml.dump(content, outp_radixconfig)
    outp_radixconfig.close()
