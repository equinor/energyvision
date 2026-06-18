const targetScripts = ['aspectRatioDefaults.mjs']

targetScripts.map(async (script) => {
  const migrationScript = await import(`./${script}`)
  const runScript = migrationScript.default
  runScript()
})
