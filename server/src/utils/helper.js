export const calculateAge = (dateOfBirth) => {
    const diffMs = Date.now() - new Date(dateOfBirth).getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };
  
  export const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => x * Math.PI / 180;
  
    const lat1 = coords1.lat;
    const lon1 = coords1.lng;
    const lat2 = coords2.lat;
    const lon2 = coords2.lng;
  
    const R = 6371; // Radius of the Earth in km
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
  
    return d;
  };
  
  export const calculateHobbiesMatch = (userHobbies, otherHobbies) => {
    let matchCount = 0;
    for (let hobby of userHobbies) {
      if (otherHobbies.includes(hobby)) {
        matchCount++;
      }
    }
  console.log(userHobbies[0] )
  console.log(otherHobbies[0])
    return (matchCount / userHobbies.length) >= 0.5;
  };