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
      blocks: [
        {
          opcode: 'createWorld',
          blockType: Scratch.BlockType.COMMAND,
          text: '[WIDTH]x[HEIGHT] boyutunda dünya oluştur [BIOME] biyomunda',
          arguments: {
            WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
            HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
            BIOME: { type: Scratch.ArgumentType.STRING, menu: 'biomes', defaultValue: 'plains' }
          }
        },
        {
          opcode: 'generateTerrain',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Doğal arazi oluştur'
        },
        {
          opcode: 'setBlockRatio',
          blockType: Scratch.BlockType.COMMAND,
          text: '[BLOCK] bloğu oranını % [PERCENT] olarak ayarla',
          arguments: {
            BLOCK: { type: Scratch.ArgumentType.STRING, menu: 'blockTypes' },
            PERCENT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 }
          }
        },
        {
          opcode: 'getBlockAt',
          blockType: Scratch.BlockType.REPORTER,
          text: '[X],[Y] konumundaki blok',
          arguments: {
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
          }
        },
        {
          opcode: 'setBlockAt',
          blockType: Scratch.BlockType.COMMAND,
          text: '[X],[Y] konumuna [BLOCK] bloğunu yerleştir',
          arguments: {
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            BLOCK: { type: Scratch.ArgumentType.STRING, menu: 'blockTypes' }
          }
        },
        {
          opcode: 'breakBlock',
          blockType: Scratch.BlockType.COMMAND,
          text: '[X],[Y] konumundaki bloğu kır',
          arguments: {
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
          }
        },
        {
          opcode: 'movePlayer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Oyuncuyu [DIRECTION] yönünde hareket ettir',
          arguments: {
            DIRECTION: {
              type: Scratch.ArgumentType.STRING,
              menu: 'directions'
            }
          }
        },
        {
          opcode: 'getPlayerPosition',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Oyuncu konumu'
        },
        {
          opcode: 'isSolidAt',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[X],[Y] konumu katı mı?',
          arguments: {
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
          }
        },
        {
          opcode: 'getInventoryCount',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Envanterdeki [BLOCK] sayısı',
          arguments: {
            BLOCK: { type: Scratch.ArgumentType.STRING, menu: 'blockTypes' }
          }
        },
        {
          opcode: 'placeFromInventory',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Envanterden [BLOCK] bloğunu [X],[Y] konumuna yerleştir',
          arguments: {
            BLOCK: { type: Scratch.ArgumentType.STRING, menu: 'blockTypes' },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
          }
        },
        {
          opcode: 'saveWorld',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Dünyayı kaydet [SLOT] numaralı yuvaya',
          arguments: {
            SLOT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
          }
        },
        {
          opcode: 'loadWorld',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Dünyayı yükle [SLOT] numaralı yuvadan',
          arguments: {
            SLOT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
          }
        },
        {
          opcode: 'getWorldSize',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Dünya boyutu'
        }
      ],
      menus: {
        blockTypes: {
          acceptReporters: true,
          items: this.blockTypes.filter(b => b.id !== '00').map(b => ({ text: b.name, value: b.id }))
        },
        directions: {
          acceptReporters: true,
          items: ['yukarı', 'aşağı', 'sol', 'sağ'].map(d => ({ text: d, value: d }))
        },
        biomes: {
          acceptReporters: true,
          items: Object.keys(this.biomes).map(b => ({ text: b, value: b }))
        }
      }
    };
  }

  createWorld(args) {
    const width = Math.max(5, Math.min(50, Number(args.WIDTH) || 20));
    const height = Math.max(5, Math.min(50, Number(args.HEIGHT) || 20));
    const biome = String(args.BIOME) in this.biomes ? String(args.BIOME) : 'plains';
    
    this.worldSize = { width, height };
    this.currentBiome = biome;
    this.blocks = [];
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.blocks.push({ x, y, id: '00' });
      }
    }
    
    this.playerPosition = {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2)
    };
    this.inventory = {};
  }

  generateTerrain() {
    if (this.blocks.length === 0) this.createWorld({ WIDTH: 20, HEIGHT: 20 });
    
    const biome = this.biomes[this.currentBiome];
    const waterLevel = biome.waterLevel || 3;
    const treeDensity = biome.treeDensity || 0.2;
    
    // Yüzey oluşturma
    for (let x = 0; x < this.worldSize.width; x++) {
      // Perlin gürültüsü benzeri yüzey yüksekliği
      const surfaceHeight = Math.floor(
        waterLevel + 3 + 
        Math.sin(x / 3) * 2 + 
        Math.random() * 2
      );
      
      for (let y = 0; y < this.worldSize.height; y++) {
        const index = y * this.worldSize.width + x;
        
        if (y > surfaceHeight + 3) {
          // Temel kayalar
          this.blocks[index].id = biome.base;
        } else if (y > surfaceHeight) {
          // Yeraltı katmanları
          this.blocks[index].id = biome.underground;
        } else if (y === surfaceHeight) {
          // Yüzey
          this.blocks[index].id = biome.surface;
        } else if (y < waterLevel) {
          // Su seviyesinin altı
          this.blocks[index].id = '04';
        }
      }
    }
    
    // Ağaçlar ve özel bloklar ekle
    if (this.currentBiome === 'forest' || this.currentBiome === 'plains') {
      for (let x = 1; x < this.worldSize.width - 1; x++) {
        const surfaceHeight = this.getSurfaceHeightAt(x);
        if (Math.random() < treeDensity && surfaceHeight > waterLevel + 1) {
          // Ağaç gövdesi
          this.setBlockAt({ X: x, Y: surfaceHeight, BLOCK: '05' });
          this.setBlockAt({ X: x, Y: surfaceHeight - 1, BLOCK: '05' });
          
          // Yapraklar
          for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -3; dy <= 0; dy++) {
              if (Math.abs(dx) + Math.abs(dy) < 4 && (dx !== 0 || dy !== 0)) {
                const leafX = x + dx;
                const leafY = surfaceHeight - 1 + dy;
                
                if (leafX >= 0 && leafX < this.worldSize.width && 
                    leafY >= 0 && leafY < this.worldSize.height) {
                  if (this.getBlockAt({ X: leafX, Y: leafY }) === '00') {
                    this.setBlockAt({ X: leafX, Y: leafY, BLOCK: '06' });
                  }
                }
              }
            }
          }
        }
      }
    }
    
    // Mağara ve oyuklar oluştur
    this.generateCaves();
    
    // Değerli mineraller ekle
    this.generateOres();
  }

  generateCaves() {
    const caveCount = Math.floor(this.worldSize.width * this.worldSize.height / 50);
    
    for (let i = 0; i < caveCount; i++) {
      const caveX = Math.floor(Math.random() * this.worldSize.width);
      const caveY = Math.floor(Math.random() * (this.worldSize.height - 5)) + 3;
      const caveSize = Math.floor(Math.random() * 3) + 1;
      
      for (let dx = -caveSize; dx <= caveSize; dx++) {
        for (let dy = -caveSize; dy <= caveSize; dy++) {
          const x = caveX + dx;
          const y = caveY + dy;
          
          if (x >= 0 && x < this.worldSize.width && y >= 0 && y < this.worldSize.height) {
            if (dx*dx + dy*dy <= caveSize*caveSize) {
              const currentBlock = this.getBlockAt({ X: x, Y: y });
              if (currentBlock !== '00' && currentBlock !== '04' && Math.random() > 0.3) {
                this.setBlockAt({ X: x, Y: y, BLOCK: '00' });
              }
            }
          }
        }
      }
    }
  }

  generateOres() {
    const oreBlocks = ['08', '09']; // Kaya ve elmas
    
    oreBlocks.forEach(ore => {
      const oreCount = Math.floor(this.worldSize.width * this.worldSize.height / 100);
      
      for (let i = 0; i < oreCount; i++) {
        const x = Math.floor(Math.random() * this.worldSize.width);
        const y = Math.floor(Math.random() * (this.worldSize.height - 5)) + 3;
        
        if (this.getBlockAt({ X: x, Y: y }) !== '00') {
          this.setBlockAt({ X: x, Y: y, BLOCK: ore });
        }
      }
    });
  }

  getSurfaceHeightAt(x) {
    for (let y = this.worldSize.height - 1; y >= 0; y--) {
      const block = this.getBlockAt({ X: x, Y: y });
      if (block !== '00' && block !== '04') {
        return y;
      }
    }
    return this.worldSize.height - 1;
  }

  setBlockRatio(args) {
    const id = String(args.BLOCK).padStart(2, '0');
    const percent = Math.max(0, Math.min(100, Number(args.PERCENT) || 0));
    if (this.blockTypes.find(b => b.id === id)) {
      this.blockRatios[id] = percent;
    }
  }

  getBlockAt(args) {
    const x = Math.floor(Number(args.X));
    const y = Math.floor(Number(args.Y));
    if (x < 0 || x >= this.worldSize.width || y < 0 || y >= this.worldSize.height) {
      return '00';
    }
    return this.blocks[y * this.worldSize.width + x]?.id || '00';
  }

  setBlockAt(args) {
    const x = Math.floor(Number(args.X));
    const y = Math.floor(Number(args.Y));
    const id = String(args.BLOCK).padStart(2, '0');
    if (x >= 0 && x < this.worldSize.width && y >= 0 && y < this.worldSize.height) {
      this.blocks[y * this.worldSize.width + x].id = id;
    }
  }

  breakBlock(args) {
    const x = Math.floor(Number(args.X));
    const y = Math.floor(Number(args.Y));
    
    if (x >= 0 && x < this.worldSize.width && y >= 0 && y < this.worldSize.height) {
      const blockId = this.getBlockAt({ X: x, Y: y });
      const blockType = this.blockTypes.find(b => b.id === blockId);
      
      if (blockType && blockType.breakable) {
        // Bloğu havaya çevir
        this.setBlockAt({ X: x, Y: y, BLOCK: '00' });
        
        // Envantere ekle
        this.inventory[blockId] = (this.inventory[blockId] || 0) + 1;
        
        // Scratch'e mesaj gönder (isteğe bağlı)
        this.runtime.emit('BLOCK_BROKEN', { blockId, x, y });
      }
    }
  }

  movePlayer(args) {
    const dir = String(args.DIRECTION);
    let nx = this.playerPosition.x;
    let ny = this.playerPosition.y;
    
    if (dir === 'yukarı') ny--;
    if (dir === 'aşağı') ny++;
    if (dir === 'sol') nx--;
    if (dir === 'sağ') nx++;
    
    if (nx < 0 || nx >= this.worldSize.width || ny < 0 || ny >= this.worldSize.height) {
      return;
    }
    
    const blockId = this.getBlockAt({ X: nx, Y: ny });
    const blockType = this.blockTypes.find(b => b.id === blockId);
    
    if (blockType) {
      if (!blockType.solid) {
        this.playerPosition = { x: nx, y: ny };
      }
      
      // Hasar veren blok kontrolü (lav gibi)
      if (blockType.damaging) {
        this.runtime.emit('PLAYER_DAMAGED', { damage: 1 });
      }
    }
  }

  getPlayerPosition() {
    return `${this.playerPosition.x},${this.playerPosition.y}`;
  }

  isSolidAt(args) {
    const id = this.getBlockAt(args);
    const type = this.blockTypes.find(b => b.id === id);
    return type ? type.solid : false;
  }

  getInventoryCount(args) {
    const blockId = String(args.BLOCK).padStart(2, '0');
    return this.inventory[blockId] || 0;
  }

  placeFromInventory(args) {
    const blockId = String(args.BLOCK).padStart(2, '0');
    const x = Math.floor(Number(args.X));
    const y = Math.floor(Number(args.Y));
    
    if ((this.inventory[blockId] || 0) > 0) {
      const currentBlock = this.getBlockAt({ X: x, Y: y });
      if (currentBlock === '00') { // Sadece hava bloklarının üzerine yerleştir
        this.setBlockAt({ X: x, Y: y, BLOCK: blockId });
        this.inventory[blockId]--;
      }
    }
  }

  saveWorld(args) {
    const slot = Math.max(1, Math.min(5, Math.floor(Number(args.SLOT)) || 1);
    const data = {
      blocks: this.blocks,
      playerPosition: this.playerPosition,
      worldSize: this.worldSize,
      inventory: this.inventory,
      biome: this.currentBiome
    };
    localStorage.setItem(`minecraftWorld_${slot}`, JSON.stringify(data));
  }

  loadWorld(args) {
    const slot = Math.max(1, Math.min(5, Math.floor(Number(args.SLOT)) || 1);
    try {
      const data = JSON.parse(localStorage.getItem(`minecraftWorld_${slot}`));
      if (data) {
        this.blocks = data.blocks || [];
        this.playerPosition = data.playerPosition || { x: 0, y: 0 };
        this.worldSize = data.worldSize || { width: 20, height: 20 };
        this.inventory = data.inventory || {};
        this.currentBiome = data.biome || 'plains';
      }
    } catch (e) {
      console.error('Dünya yüklenemedi:', e);
    }
  }

  getWorldSize() {
    return `${this.worldSize.width}x${this.worldSize.height}`;
  }
}

Scratch.extensions.register(new MinecraftMap());
