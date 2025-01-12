import { Request, Response } from 'express';
import KPI from '../models/kpi';

export const getKPIs = async (req: Request, res: Response): Promise<void> => {
  try {
    const kpis = await KPI.find();
    res.json(kpis);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createKPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const newKPI = new KPI(req.body);
    await newKPI.save();
    res.status(201).json(newKPI);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createMultipleKPIs = async (req: Request, res: Response): Promise<void> => {
  try {
    const kpis = req.body;
    const results = [];

    for (const kpiData of kpis) {
      const existingKPI = await KPI.findOne({ type: kpiData.type });

      if (existingKPI) {
        existingKPI.count = kpiData.count;
        await existingKPI.save();
        results.push(existingKPI);
      } else {
        const newKPI = new KPI(kpiData);
        await newKPI.save();
        results.push(newKPI);
      }
    }

    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateKPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedKPI = await KPI.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedKPI) {
      res.status(404).json({ message: 'KPI not found' });
      return;
    }
    res.json(updatedKPI);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteKPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedKPI = await KPI.findByIdAndDelete(req.params.id);
    if (!deletedKPI) {
      res.status(404).json({ message: 'KPI not found' });
      return;
    }
    res.json({ message: 'KPI deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};