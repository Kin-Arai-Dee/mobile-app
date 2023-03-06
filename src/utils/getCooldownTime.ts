const getCooldownTime = () => {
  const currentHour = new Date().getHours()
  if (currentHour < 4) {
    // set cooldown to 4:00
    const cooldownTime = new Date()
    cooldownTime.setHours(4, 0, 0, 0)
    return cooldownTime.getTime() - new Date().getTime()
  }
  if (currentHour < 11) {
    // set cooldown to 11:00
    const cooldownTime = new Date()
    cooldownTime.setHours(11, 0, 0, 0)
    return cooldownTime.getTime() - new Date().getTime()
  } else if (currentHour < 16) {
    // set cooldown to 16:00
    const cooldownTime = new Date()
    cooldownTime.setHours(16, 0, 0, 0)
    return cooldownTime.getTime() - new Date().getTime()
  } else {
    // set cooldown to 4:00 the next day
    const cooldownTime = new Date()
    cooldownTime.setDate(cooldownTime.getDate() + 1)
    cooldownTime.setHours(4, 0, 0, 0)
    return cooldownTime.getTime() - new Date().getTime()
  }
}

export default getCooldownTime
