module.exports = async (srv) => {
    srv.on('greetings', (req, res) => {
        return "Good Morning" + req.data.name;
    });

    srv.on('multiply', (req, res) => {
        return req.data.x * req.data.y;
    })
}