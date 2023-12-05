import ToastMessage from '@/components/config/ToastMessage'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col p-[3%] max-w-[1250px]'>
      <h1 className='w-full font-bold text-4xl mb-[50px] text-center'>Sobre a Cloudify</h1>
      <section className='mt-12'>
        <h2 className='font-semibold text-lg'>Quem Somos</h2>
        <p className='text-[#717171] text-justify'>Somos uma equipe apaixonada de profissionais dedicados a fornecer uma solução de armazenamento na nuvem que transforma a maneira como você gerencia, compartilha e acessa seus arquivos. Fundada com a missão de simplificar a vida digital, a Cloudify é mais do que uma plataforma de armazenamento - somos seus parceiros na jornada para uma produtividade eficiente e segura.</p>
      </section>
      <section className='mt-12'>
        <h2 className='font-semibold text-lg'>O Que Nos Torna Únicos</h2>
        <p className='text-[#717171] text-justify'>Na Cloudify, acreditamos que a inovação está no cerne de tudo o que fazemos. Nossa plataforma é projetada para ser intuitiva e fácil de usar, garantindo que tanto usuários individuais quanto empresas possam tirar o máximo proveito de suas capacidades. Com recursos avançados de segurança e uma abordagem centrada no cliente, oferecemos um ambiente de armazenamento na nuvem que você pode confiar.</p>
      </section>
      <section className='mt-12'>
        <h2 className='font-semibold text-lg'>Nossa Visão</h2>
        <p className='text-[#717171] text-justify'>Visualizamos um futuro onde a gestão de arquivos na nuvem é tão natural quanto respirar. Queremos capacitar indivíduos e organizações a atingir seu potencial máximo, fornecendo uma solução de armazenamento que transcende barreiras e promove uma colaboração perfeita.</p>
      </section>
      <section className='mt-12'>
        <h2 className='font-semibold text-lg'>Compromisso com a Segurança</h2>
        <p className='text-[#717171] text-justify'>Compreendemos a importância da segurança dos seus dados. Na Cloudify, implementamos as mais recentes práticas de segurança para garantir que seus arquivos estejam protegidos contra ameaças cibernéticas. Sua confiança é nossa prioridade.</p>
      </section>
      <section className='mt-12'>
        <h5 className='italic'>Explore a Cloudify e descubra como podemos simplificar sua vida digital, ofer className='italic'ecendo uma experiência de armazenamento na nuvem que redefine o significado de eficiência e segurança. Junte-se a nós enquanto moldamos o futuro da gestão de arquivos na nuvem!</h5>
        <h6 className='mt-4 text-sm text-[#717171]'>Bem-vindo à revolução Cloudify - onde a simplicidade encontra a inovação.</h6>
      </section>
    </div>
  )
}

export default page