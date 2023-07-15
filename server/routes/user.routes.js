const express = require('express')
const User = require('../models/User')
const auth = require('../middlewere/auth.middleware')
const router = express.Router({ mergeParams: true })

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params

    console.log(req.user)

    // todo: userId === current user id
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndRemove(userId, req.body, {
        new: true,
      })
      res.send(updatedUser)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    //console.log(req.user)
    const list = await User.find()
    res.send(list) // если status 200 то можно не указывать
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

module.exports = router
