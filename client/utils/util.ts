const getAvatar = (username: string) => {
    const splittedName = username.split(" ")
    console.log("Splitted Name:", splittedName);
    if (splittedName.length === 1) {
      return splittedName[0].toUpperCase().charAt(0) + splittedName[0].toUpperCase().charAt(1)
    } else if (splittedName.length > 1) {
      return (splittedName[0].charAt(0) + splittedName[1].charAt(0)).toUpperCase()
    } else {
      return "U"
    }
}

export { getAvatar }