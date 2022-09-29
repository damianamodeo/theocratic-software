export const LinkText = ({href, children}) => {
  return (
    <a className="text-secondary dark:text-secondaryD font-noto text-lg font-semibold truncate m-2" href={href}>{children}</a>
  )
}