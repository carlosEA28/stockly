const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen">
      {/* IMAGE */}
      <div className="px-8 py-6">
        <h1 className="font-bold size-6">STOCKLY</h1>
      </div>

      {/* BOTOES */}
      <div className="flex flex-col gap-2 p-2">
        <button className="px-6 py-3">Dashborad</button>
        <button className="px-6 py-3">Produtos</button>
        <button className="px-6 py-3">Vendas</button>
      </div>
    </div>
  );
};

export default Sidebar;
