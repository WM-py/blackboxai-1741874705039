import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <i className="fas fa-graduation-cap text-blue-600 text-2xl mr-2"></i>
              <span className="font-poppins font-bold text-xl text-gray-800">Agenda Digital Escolar</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                Sobre
              </button>
              <button className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                Contato
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-150">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl font-poppins">
            <span className="block">Gestão Acadêmica</span>
            <span className="block text-blue-600">Simplificada</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-inter">
            Conectando alunos, professores e responsáveis em uma única plataforma digital para melhor acompanhamento do desenvolvimento acadêmico.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Começar Agora
              </button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                    <i className="fas fa-calendar-alt text-white text-2xl"></i>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Agenda Integrada</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Acompanhe eventos, aulas e atividades em um único lugar, com sincronização em tempo real.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                    <i className="fas fa-comments text-white text-2xl"></i>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Comunicação Direta</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Canal direto entre professores e responsáveis para acompanhamento do desenvolvimento.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                    <i className="fas fa-chart-line text-white text-2xl"></i>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Desempenho Acadêmico</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Acompanhamento de notas, frequência e evolução do aluno de forma clara e objetiva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-24">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400">&copy; 2024 Agenda Digital Escolar. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
