const Navbar = () => {
    return (
      <div className="container-2xl flex justify-between container-min py-4">
        <h5><a className="Link-Alt" href="/">SmartPlants</a></h5>
        <div className="flex gap-8">
            <h5><a className="Link-Alt" href="/dashboard">Dashboard</a></h5>
            <h5><a className="Link-Alt" href="/info">Info</a></h5>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  