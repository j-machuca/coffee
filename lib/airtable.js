import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
);

export const table = base("coffee-stores");

export const getMinifiedRecord = (record) => {
    return {
        ...record.fields,
    };
};

export const getRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
};
