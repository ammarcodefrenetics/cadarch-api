import { RenovationInterface } from '../models/renovationModel';
import {
    addRenovationUtil,
    readAllRenovationUtil,
    deleteOneRenovationUtil,
    updateOneRenovationUtil,
    readAllPaginatedRenovationsUtil,
    readAllPaginatedRenovationsHistoryUtil
} from '../utils/renovationUtil';

const addRenovation = async (req: any, res: any) => {
    try {
        if (req.body) {
            console.log(req.body, "renovation body")
            let renovation: RenovationInterface = req.body
            let response = await addRenovationUtil(req, res, renovation);
            res.json(response);
        }
    } catch (err) { console.log(err) }

}
const updateOneRenovation = async (req: any, res: any) => {
    try {
        let id = req.query.id;
        let response = await updateOneRenovationUtil(req, res, id);
        res.json(response);
    } catch (err) { console.log(err) }
}
const readAllRenovation = async (req: any, res: any) => {
    try {
        let response = await readAllRenovationUtil();
        res.json(response);
    } catch (err) { console.log(err) }
}

const readAllPaginatedRenovations = async (req: any, res: any) => {
    try {
        console.log(req.query , "req query")
        let response = await readAllPaginatedRenovationsUtil(req);
        res.json(response);
    } catch (err) { console.log(err) }
}

const readAllPaginatedRenovationsHistory = async (req: any, res: any) => {
    try {
        let response = await readAllPaginatedRenovationsHistoryUtil(req);
        res.json(response);
    } catch (err) { console.log(err) }
}
const deleteOneRenovation = async (req: any, res: any) => {
    try {
        let id = req.query.id;
        let response = await deleteOneRenovationUtil(id);
        res.json(response);
    } catch (err) { console.log(err) }
}
export { addRenovation, readAllRenovation, deleteOneRenovation, updateOneRenovation, readAllPaginatedRenovations, readAllPaginatedRenovationsHistory }