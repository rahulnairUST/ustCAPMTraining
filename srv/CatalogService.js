module.exports = cds.service.impl( async function(){

    //Step 1: get the object of our odata entities
    const { EmployeeSet, POs } = this.entities;

    //Step 2: define generic handler for validation
    this.before('UPDATE', EmployeeSet, (req)=>{
        var salary = parseInt(req.data.salaryAmount);
        if(salary >= 1000000) {
            req.error(500,"Ola! sorry no one can get this salary in my org");
        }
    });

    this.after('READ', EmployeeSet, (data)=>{
        data.push({
            "ID": "CUSTOM",
            "nameFirst": "Rahul"
        });
    });

    this.on('boost', async (req,res) => {
        try {
            const ID = req.params[0];
            console.log("Hey Amigo, Your purchase order with id " + req.params[0] + " will be boosted");
            const tx = cds.tx(req);
            await tx.update(POs).with({
                GROSS_AMOUNT: { '+=' : 20000 },
                NOTE: 'Boosted!!'
            }).where(ID);
        } catch (error) {
            return "Error " + error.toString();
        }
    });

    this.on('getOrderDefaults', async (req,res) => {
        return {
            "OVERALL_STATUS": "N"
        };
    });

    this.on('largestOrder', async (req,res) => {
        try {
            const ID = req.params[0];
            const tx = cds.tx(req);
            
            //SELECT * UPTO 1 ROW FROM dbtab ORDER BY GROSS_AMOUNT desc
            // const reply = await tx.read(POs).orderBy({
            //     GROSS_AMOUNT: 'desc'
            // }).limit(2);

            // without using transaction method
            const reply = await SELECT.one.from(POs).orderBy('GROSS_AMOUNT desc');

            return reply;
        } catch (error) {
            return "Error " + error.toString();
        }
    });

}
);