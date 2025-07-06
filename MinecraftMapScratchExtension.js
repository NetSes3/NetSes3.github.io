// MinecraftMap Scratch Extension
class MinecraftMap {
  constructor(runtime) {
    this.runtime = runtime;
    this.blocks = [];
    this.playerPosition = { x: 0, y: 0 };
    this.worldSize = { width: 20, height: 20 };
    this.inventory = {};
    this.blockRatios = {
      '01': 15, '02': 15, '03': 15,
      '04': 10, '05': 5, '06': 5,
      '07': 10, '08': 10, '09': 5,
      '10': 10
    };
    this.blockTypes = [
      { id: '00', name: 'Hava', color: '#7EC0EE', solid: false, breakable: false },
      { id: '01', name: 'Taş', color: '#808080', solid: true, breakable: true },
      { id: '02', name: 'Toprak', color: '#8B4513', solid: true, breakable: true },
      { id: '03', name: 'Çim', color: '#7CFC00', solid: true, breakable: true },
      { id: '04', name: 'Su', color: '#1E90FF', solid: false, breakable: false },
      { id: '05', name: 'Ağaç', color: '#8B4513', solid: true, breakable: true },
      { id: '06', name: 'Yaprak', color: '#32CD32', solid: false, breakable: true },
      { id: '07', name: 'Kum', color: '#F4A460', solid: true, breakable: true },
      { id: '08', name: 'Kaya', color: '#A9A9A9', solid: true, breakable: true },
      { id: '09', name: 'Elmas', color: '#00BFFF', solid: true, breakable: true },
      { id: '10', name: 'Lav', color: '#FF4500', solid: false, breakable: false, damaging: true }
    ];
    this.biomes = {
      'plains': { surface: '03', underground: '02', base: '01', waterLevel: 3 },
      'desert': { surface: '07', underground: '07', base: '08', waterLevel: 1 },
      'forest': { surface: '03', underground: '02', base: '01', waterLevel: 4, treeDensity: 0.3 },
      'mountains': { surface: '08', underground: '01', base: '01', waterLevel: 2 }
    };
    this.currentBiome = 'plains';
  }

  getInfo() {
    return {
      id: 'minecraftmap',
      name: 'Minecraft Haritası',
      color1: '#4CBB17',
      color2: '#3AA10E',
      blocks: [],
      menus: {}
    };
  }
}

Scratch.extensions.register(new MinecraftMap());