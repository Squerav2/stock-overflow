<template>
  <main class="watchlist-page">
      <Sidebar />
      <Header> </Header>
      <div class="stock-list">
    <div class="stock-header">
      <div class="stock-header-cell">Hisse Senedi</div>
      <div class="stock-header-cell">AÇILIŞ</div>
      <div class="stock-header-cell">DÜŞÜK</div>
      <div class="stock-header-cell">YÜKSEK</div>
      <div class="stock-header-cell">KAPANIŞ</div>
      <div class="stock-header-cell">HACİM</div>
    </div>
    <div class="stock-item" v-for="stock in stocks" :key="stock.id">
      <div class="stock-cell stock-name">
          <button @click="toggleWatchlist(stock)" :class="{ 'starred': stock.isStarred, 'not-starred': !stock.isStarred }">
              <span class="material-icons">star</span>
          </button>
        <img :src="stock.logo" class="stock-logo" alt="logo" />
        <div>
          <div class="stock-title">{{ stock.symbol }}</div>

        </div>
      </div>
      <div class="stock-cell">{{ parseFloat(stock.open).toFixed(3) }}</div>
        <div class="stock-cell">{{ parseFloat(stock.low).toFixed(3) }}</div>
        <div class="stock-cell">{{ parseFloat(stock.high).toFixed(3) }}</div>
        <div class="stock-cell">{{ parseFloat(stock.close).toFixed(3) }}</div>
        <div class="stock-cell">{{ parseFloat(stock.volume).toFixed(3) }}</div>
    </div>
  </div>
  </main>
</template>
<script>



import { ref, onMounted } from 'vue';

export default {
  name: 'StockList',
  setup() {
    const stocks = ref([]);

    function initializeWebSocket() {
      const socket = new WebSocket('ws://' + window.location.hostname + ':3000');
      console.log('WebSocket bağlantısı başlatıldı');

      socket.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          console.log('Gelen veri:', parsedData);

          if (Array.isArray(parsedData)) {
            // Assuming parsedData is an array of stock objects
            stocks.value = parsedData.map(stock => ({
              symbol: stock.symbol,
              open: stock.open,
              high: stock.high,
              low: stock.low,
              close: stock.close,
              volume: stock.volume,
            }));
          } else {
            console.error('Gelen veri beklenen dizi formatında değil:', parsedData);
          }
        } catch (error) {
          console.error('Veri parse edilirken bir hata oluştu:', error);
        }
      };
    }

    onMounted(initializeWebSocket);

    return {
      stocks,
    };
  },
};
</script>

<style scoped>

.stock-list {
max-width: 60%; /* Tüm genişliği kullan */
margin: 30px auto 0 auto;
border: 1px solid #e1e4e8;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stock-header, .stock-item {
display: flex;
justify-content: space-between;
align-items: center;
}

.stock-header {
background-color: #f7f7f7;
font-weight: bold;
}

.stock-header-cell, .stock-cell {
flex: 1;
text-align: center;
padding: 16px;
border-bottom: 1px solid #e1e4e8;
}

.stock-header-cell:first-child, .stock-cell:first-child {
flex: 2; /* Hisse senedi adı için daha geniş alan */
}

.stock-header-cell {
padding: 10px 0; /* Başlık yüksekliği */
}

.stock-cell {
padding: 10px 0; /* İçerik hücresi yüksekliği */
}

.stock-name {
display: flex;
align-items: center;
justify-content: flex-start;
}

.stock-logo {
width: 30px;
height: 30px;
margin-right: 10px;
}

.stock-title {
font-weight: bold;
}

.stock-ticker {
font-size: 0.85rem;
color: #555;
}

.stock-header:last-child, .stock-item:last-child {
border-bottom: none;
}

.starred {
  color: yellow; /* Yıldızlanmış hisseler için sarı yıldız */
}

.not-starred {
  color: bla; /* Yıldızlanmamış hisseler için beyaz yıldız */
}

.material-icons {
  font-size: 1.5rem;
  margin-right: 1rem;
}

</style>
