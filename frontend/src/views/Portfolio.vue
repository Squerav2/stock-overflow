<template>
  <main class="portfolio-page">
    <sideBar />
    <Header></Header>

    <div class="stock-list">
      <div class="stock-header">
        <div class="stock-header-cell">Hisse Senedi</div>
        <div class="stock-header-cell">MALİYET</div>
        <div class="stock-header-cell">FİYAT</div>
        <div class="stock-header-cell">ADET</div>
        <div class="stock-header-cell">KAR/ZARAR</div>
      </div>
      <div class="stock-item" v-for="stock in stocks" :key="stock.id">
        <div class="stock-cell stock-name">
          <img :src="stock.logo" class="stock-logo" alt="logo" />
          <div>
            <div class="stock-title">{{ stock.name }}</div>
            <div class="stock-ticker">{{ stock.ticker }}</div>
          </div>
        </div>
        <div class="stock-cell">{{ stock.cost }}</div>
        <div class="stock-cell">{{ stock.price }}</div>
        <div class="stock-cell">{{ stock.number }}</div>
        <div class="stock-cell">{{ stock.profitloss }}</div>
      </div>
      

    </div>

    <!-- Ekleme buton -->
    <div class="add-stock-button">
        <button @click="showAddStockForm = true"><span class="material-icons">add</span></button>
      </div>

      <!-- Ekleme Formu (Modal/Pencere olarak) -->
      <div v-if="showAddStockForm" class="add-stock-form">
        <form @submit.prevent="addStock">
          <input type="text" placeholder="Hisse Adı" v-model="newStock.name" required>
          <h3> Price </h3>
          <input type="number" placeholder="Maliyet" v-model="newStock.cost" required>
          <h3> Quantity </h3>
          <input type="number" placeholder="Adet" v-model="newStock.number" required>
          <div class="form-buttons">
            <button type="submit">Ekle</button>
            <button type="button" @click="showAddStockForm = false">İptal</button>
          </div>
        </form>
      </div>

    <!-- Toplam maliyet ve kar/zarar bilgileri -->
    <div class="portfolio-summary">
      <div class="summary-item">
        <div class="summary-title">Toplam Maliyet</div>
        <div class="summary-value">{{ totalCost }}</div>
      </div>
      <div class="summary-item">
        <div class="summary-title">Toplam Hisse Değerleri</div>
        <div class="summary-value">{{ totalValue }}</div>
      </div>
      <div class="summary-item">
        <div class="summary-title">Toplam Fark</div>
        <div class="summary-value">{{ totalDifference }}</div>
      </div>
      <div class="summary-item">
        <div class="summary-title">Toplam Kar/Zarar Yüzdesi</div>
        <div class="summary-value">{{ totalProfitLossPercentage }}%</div>
      </div>
    </div>

  </main>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import Header from '../components/Header.vue'
</script>

<script>
export default {
  name: 'StockList',
  data() {
    return {
      stocks: [],
      showAddStockForm: false,
      newStock: { name: '', cost: 0, number: 0 },
      priceUpdatesWs: null, // WebSocket connection stored here
    };
  },

  created() {
    this.priceUpdatesWs = new WebSocket('ws://localhost:3000/stock/multiple');

    this.priceUpdatesWs.onopen = () => {
      this.priceUpdatesWs.send(JSON.stringify({
        symbols: ["AAPL"]
      }));
    };

    this.priceUpdatesWs.onmessage = (event) => {
      const updatedStock = JSON.parse(event.data);

      const stockIndex = this.stocks.findIndex(stock => stock.stock_id === updatedStock.stock_id);

      if (stockIndex !== -1) {
        this.$set(this.stocks, stockIndex, updatedStock);
      }
    };
  },

  async mounted() {
    await this.fetchStocks();
    this.initializeWebSocket();
  },
  beforeDestroy() {
    if (this.priceUpdatesWs) {
      this.priceUpdatesWs.close(); // Close WebSocket connection when component is destroyed
    }
  },
  methods: {
    async fetchStocks() {
      try {
        const userId = 1; // Replace with the logged-in user's ID
        const response = await fetch(`http://localhost:3000/portfolio/user/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const portfolioData = await response.json();
        this.stocks = portfolioData.map(item => ({
          id: item.p_id,
          name: item.stock_id || 'Unknown',

          logo: item.logo || 'default-logo.png',
          cost: parseFloat(item.price) || 0,
          price: parseFloat(item.current_price) || 0,
          number: parseInt(item.quantity, 10),
          profitloss: 0, // This will be calculated when the WebSocket sends updates
        }));

        // After fetching the stocks, we subscribe to their updates via WebSocket
        this.stocks.forEach(stock => {
          this.priceUpdatesWs.send(JSON.stringify({ symbols: [stock.stock_id] }));
        });

      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    },
    initializeWebSocket() {
      // Initialize WebSocket connection
      this.priceUpdatesWs = new WebSocket('ws://localhost:3000/stock/multiple');
      // WebSocket event listeners and message handling logic
    },
    calculateProfitLoss(stock) {
      // Calculate profit/loss based on updated price and original cost
    },
    async addStock() {
      // Add stock logic
    },
    // ...other methods if needed
  },
  computed: {
    totalCost() {
      // Computed total cost
    },
    totalValue() {
      // Computed total value of stocks
    },
    totalDifference() {
      // Computed total difference
    },
    totalProfitLossPercentage() {
      // Computed total profit/loss percentage
    },
  },
};
</script>


<style scoped>
.stock-list {
  max-width: 60%;
  /* Tüm genişliği kullan */
  margin: 30px auto 0 auto;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stock-header,
.stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stock-header {
  background-color: #f7f7f7;
  font-weight: bold;
}

.stock-header-cell,
.stock-cell {
  flex: 1;
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid #e1e4e8;
}

.stock-header-cell:first-child,
.stock-cell:first-child {
  flex: 2;
  /* Hisse senedi adı için daha geniş alan */
}

.stock-header-cell {
  padding: 10px 0;
  /* Başlık yüksekliği */
}

.stock-cell {
  padding: 10px 0;
  /* İçerik hücresi yüksekliği */
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

.stock-header:last-child,
.stock-item:last-child {
  border-bottom: none;
}


.portfolio-summary {
  max-width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background-color: #f9f9f9;
  border-top: 1px solid #e1e4e8;
}

.summary-item {
  text-align: center;
}

.summary-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.summary-value {
  font-size: 1.2rem;
} 


/* Hisse Ekleme Formu Stili */
.add-stock-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); /* Hafifçe koyulaştırılmış arka plan */
  z-index: 1000;
}

.add-stock-form form {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 400px; /* Form genişliği */
}

.add-stock-form input[type="text"],
.add-stock-form input[type="number"] {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px; /* Yazı tipi boyutu */
  box-sizing: border-box; /* Border ve padding boyutlarına dahil */
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.add-stock-form button {
  width: 48%;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px; /* Yazı tipi boyutu */
  cursor: pointer;
  transition: background-color 0.3s; /* Geçiş animasyonu */
}

.add-stock-form button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}

.add-stock-form button[type="button"] {
  background-color: #f44336;
  color: white;
}

.add-stock-form button:hover {
  opacity: 0.9; /* Fare üzerine geldiğinde efekt */
}

/* Ekle Butonu Stili */
.add-stock-button {
  text-align: center;
  margin-top: 20px;
}

.add-stock-button button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-stock-button button:hover {
  background-color: #0056b3;
}

</style>
