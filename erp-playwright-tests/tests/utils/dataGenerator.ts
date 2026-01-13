export function randomPhone() {
  return '09' + Math.floor(10000000 + Math.random() * 90000000).toString();
}

export function randomTIN() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export function randomName() {
  const names = ['Mekonen', 'Sisay', 'Almaz', 'Kebede', 'Tigist'];
  return names[Math.floor(Math.random() * names.length)];
}
