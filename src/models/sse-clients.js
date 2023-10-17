export class Clients {
  constructor() {
    this.allClients = [];
  }
  addNewClient(res) {
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      res,
    };

    this.allClients.push(newClient);
    return clientId;
  }
  closeClient(id) {
    this.allClients = this.allClients.filter((c) => c.id !== id);
  }
  sendNotificationToAllClients(notificationMsg) {
    this.allClients.forEach((client) =>
      client.res.write(`data: ${JSON.stringify(notificationMsg)}\n\n`)
    );
  }
}

export default Clients;
