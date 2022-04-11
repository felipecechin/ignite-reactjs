import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        { id: 1, title: 'freelancer', type: 'deposit', category: 'dev', amount: 600, createdAt: new Date('2021-08-10 10:40:24') },
        { id: 2, title: 'Aluguel', type: 'withdraw', category: 'casa', amount: 600, createdAt: new Date('2021-08-13 10:40:24') },
      ]
    })
  },

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data)
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
