export default function Spinner({color}:{color:string}) {
  return (
<div className={`animate-spin mr-2 h-5 w-5 border-4 border-t-transparent border-${color} rounded-full`}></div>
  )
}