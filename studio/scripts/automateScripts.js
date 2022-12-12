const targetScripts = ['migrateFullWidthImage.js', 'convertToPortableText.js']

targetScripts.map(async (script) => {
  const migrationScript = await import(`./${script}`)
  const runScript = migrationScript.default
  runScript()
})
