import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Router from 'next/router'

type DocumentProps = {
  id: string
  fileName: string
  date: {
    toDate: () => Date
  }
}

function DocumentRow({ id, fileName, date }: DocumentProps) {
  return (
    <div
      className="max-w-3xl mx-auto flex items-center p-4 rounded-lg
      hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
      onClick={() => Router.push(`/document/${id}`)}
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="border-0"
      >
        <Icon name="more_vert" size="3xl" />
      </Button>
    </div>
  )
}

export default DocumentRow
