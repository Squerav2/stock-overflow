
<template>
    <main class="watchlist-page">
        <Sidebar />
        <Header> </Header>
        <div class="stock-list">
      <div class="stock-header">
        <div class="stock-header-cell">Hisse Senedi</div>
        <div class="stock-header-cell">SON</div>
        <div class="stock-header-cell">DÜŞÜK</div>
        <div class="stock-header-cell">YÜKSEK</div>
        <div class="stock-header-cell">FARK</div>
      </div>
      <div class="stock-item" v-for="stock in stocks" :key="stock.id">
        <div class="stock-cell stock-name">
            <button @click="toggleWatchlist(stock)" :class="{ 'starred': stock.isStarred, 'not-starred': !stock.isStarred }">
                <span class="material-icons">star</span>
            </button>
          <img :src="stock.logo" class="stock-logo" alt="logo" />
          <div>
            <div class="stock-title">{{ stock.name }}</div>
            <div class="stock-ticker">{{ stock.ticker }}</div>
          </div>
        </div>
        <div class="stock-cell">{{ stock.price }}</div>
        <div class="stock-cell">{{ stock.low }}</div>
        <div class="stock-cell">{{ stock.high }}</div>
        <div class="stock-cell">{{ stock.last }}</div>
      </div>
    </div>
    </main>
</template>

<script setup>
import Sidebar from '../components/SideBar.vue';
import Header from '../components/Header.vue';
</script>

<script>
export default {
  name: 'StockList',
  data() {
    return {
      stocks: [
        // Hisse senedi verileriniz buraya gelecek
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
        { id: 1, name: 'Apple', ticker: 'AAPL', logo: 'apple-logo.png', price: '150', low: '147', high: '155', last: '149' },
    
        // Diğer hisse senetleri...
      ]
    };
  },
  methods: {
    toggleWatchlist(stock) {
      stock.isStarred = !stock.isStarred;
      // Back-end güncellemesi ve diğer işlemler
    }
    // Diğer metodlar...
  }
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
