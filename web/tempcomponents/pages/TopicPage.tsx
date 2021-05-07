const TopicPage = ({ data }) => {
  console.log(data)
  return (
    <div>
      <h1>Hello {data?.title}</h1>
    </div>
  )
}

export default TopicPage
