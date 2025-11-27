import logo from "../../assets/download.png"

export default function Header() {
  return (
    <div className="w-full h-22 bg-white border-b border-gray-300 border-2 shadow-2xl  px-2.5 lg:px-10">
      <img src={logo} alt="logo" className="h-20" />  
    </div>
  )
}
