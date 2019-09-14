setTimeout(() => {
  require('child_process').execSync(
    'npm start',
    {stdio: 'inherit'}
  )
}, 5000)
