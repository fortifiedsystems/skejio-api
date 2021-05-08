exports.getStatus = (req, res) => {
    const currentTime = new Date().toLocaleString()
    res.status(200).json({
      status: 200,
      message: `Server is live at ${currentTime}`,
      owner: 'Screen Indie',
    })
  }
  
  exports.get404 = (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'This is not the end point you are looking for!',
    })
  }
  