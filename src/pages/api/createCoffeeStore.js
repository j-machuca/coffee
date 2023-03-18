import { getRecords, table } from "../../../lib/airtable";

const createCoffeeStore = async (req, res) => {
    if (req.method === "POST") {
        const { id, name, address, neighborhood, voting, imgUrl } = req.body;

        try {
            if (id) {
                // If there is an ID in request fetch it from the DB

                const findCoffeeStoreRecords = await table
                    .select({
                        filterByFormula: `id=${id}`,
                    })
                    .firstPage();

                // Check DB if record exist and return
                if (findCoffeeStoreRecords.length !== 0) {
                    const records = getRecords(findCoffeeStoreRecords);

                    return res.json(records);
                } else {
                    //create a record

                    if (name) {
                        console.log("4");
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    address,
                                    neighborhood,
                                    voting,
                                    imgUrl,
                                },
                            },
                        ]);

                        const records = getRecords(createRecords);

                        return res.json(records);
                    } else {
                        return res
                            .status(400)
                            .json({ message: "Id or name is missing" });
                    }
                }
            } else {
                return res.status(400).json({ message: "Id is missing" });
            }
        } catch (err) {
            console.error("Error creating or finding a store", err);
            return res.status(500).json({
                message: "Error creating or finding a store",
                err,
            });
        }
    } else {
        return res.status(400).json({ message: "Method is not Allowed" });
    }
};

export default createCoffeeStore;
