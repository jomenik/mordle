// src/components/Tile.jsx
const Tile = ({ letter, status }) => {
    let backgroundColor;
  
    switch (status) {
      case 'correct':
        backgroundColor = 'bg-green-500'; // Zielony (litera w dobrym miejscu)
        break;
      case 'present':
        backgroundColor = 'bg-yellow-500'; // Żółty (litera w słowie, ale w złym miejscu)
        break;
      case 'absent':
        backgroundColor = 'bg-gray-500'; // Szary (litera nie występuje w słowie)
        break;
      default:
        backgroundColor = 'bg-white'; // Domyślny stan
        break;
    }
  
    return (
      <div
        className={`${backgroundColor} text-white flex justify-center items-center w-12 h-12 m-1 text-2xl font-bold`}
      >
        {letter}
      </div>
    );
  };
  
  export default Tile;
  