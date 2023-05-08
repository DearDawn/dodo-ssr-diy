export const getList = async (str = '456') => {
  return Promise.resolve(Array.from({ length: 10000 }).map(it => str))
}

export const getInitialData = () => {
  return Promise.resolve({
    globalData: {
      user_id: 123,
      user_name: 'dodo'
    }
  })
}