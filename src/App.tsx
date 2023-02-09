import Logo from '@/assets/logo.svg'
import google_play from '@/assets/google-play.svg'
import app_galler from '@/assets/app-gallery.svg'
import web_version from '@/assets/web-version.svg'
import telegram from '@/assets/telegram.svg'
import discord from '@/assets/discord.svg'
import instagram from '@/assets/instagram.svg'
import preview from '@/assets/preview.png'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className='max-h-51 row items-center gap-2'>
        <img src={Logo}></img>
        <p className='text-left font-medium leading-5 text-xl'>MEGU<br></br>Shedule</p>
      </div>
      <div className='flex flex-col gap-0 items-center md:flex-row md:flex-nowrap lg:gap-3'>
        <div className='mt-6 flex-1 md:mt-0 '>
          <h1 className='font-regular shrink text-center text-xl md:text-left md:text-4xl lg:text-5xl xl:text-6xl mb-7'>
            Завантажуйте застосунок<br></br>MEGU Shedule
          </h1>
          <p className='mb-16 font-light text-center md:text-left text-base'>Усі ваші пари та сесії у вашому девайсі.<br></br>Без PDF та Excel файлів.</p>
          <div className='mb-16 items-center flex flex-col gap-5 h-13 md:gap-2 lg:flex-row'>
            <a href='/'>
              <img style={{ height: 45, width: 150 }} src={google_play}></img>
            </a>
            <a href='/'>
              <img style={{ height: 45, width: 150 }} src={app_galler}></img>
            </a>
            <a href='/'>
              <img style={{ height: 45, width: 150 }} src={web_version}></img>
            </a>
          </div>
        </div>
        <div className='md:shrink-0'>
          <img className='' src={preview} alt="preview" />
        </div>
      </div>
      <p className='mb-2 mt-5 font-light text-left text-base'>Якщо виникли якісь питання</p>
      <div className='row gap-3'>
        <a href='/'>
          <img style={{ height: 33, width: 33 }} src={telegram}></img>
        </a>
        <a href='/'>
          <img style={{ height: 33, width: 33 }} src={discord}></img>
        </a>
        <a href='/'>
          <img style={{ height: 33, width: 33 }} src={instagram}></img>
        </a>
      </div>
    </div>
  )
}

export default App
