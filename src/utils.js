/** 根据 URL 解析出对应的组件 */
export const getCompName = (str = '') => {
  const pathName = str.replace(/\//g, '').toLowerCase() || 'home'
  // 转大驼峰
  const compoName = pathName.replace(/(^\w)|_(\w)/g, (_, p, q) => (p || q).toUpperCase()
  )

  return { pathName, compoName }
}