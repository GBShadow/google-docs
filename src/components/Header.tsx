import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center 
    px-4 py-2 shadow-md bg-white"
    >
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="h-20 w-20 border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>

      <div
        className="mx-5 md:mx-20 flex flex-grow items-center px-5 
      py-2 bg-gray-100 text-gray-600 rounded-lg 
      focus-within:text-gray-600 focus-within:shadow-md"
      >
        <Icon name="search" size="3xl" color="darkgray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="ml-5 md:ml-20 h-20 w-20 border-0"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>

      <img
        loading="lazy"
        onClick={() => {}}
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        src="https://media-exp1.licdn.com/dms/image/C4D03AQGpW7O4TIwy_w/profile-displayphoto-shrink_100_100/0/1628095988663?e=1633564800&v=beta&t=hgw2_1G8DmVLKFbzR72FdM00yUXatHof968sMc53N7c"
        alt=""
      />
    </header>
  )
}
