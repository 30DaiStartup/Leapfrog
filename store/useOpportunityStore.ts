import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Opportunity, CreateOpportunityInput } from '@/types/models/opportunity';
import { hardcodedScenario } from '@/lib/data/hardcodedScenario';

interface OpportunityStore {
  // Opportunities list
  opportunities: Opportunity[];

  // Currently selected opportunity
  selectedOpportunityId: string | null;

  // Actions
  createOpportunity: (input: CreateOpportunityInput) => Opportunity;
  deleteOpportunity: (id: string) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  selectOpportunity: (id: string | null) => void;
  getOpportunity: (id: string) => Opportunity | undefined;
  getSelectedOpportunity: () => Opportunity | undefined;
}

export const useOpportunityStore = create<OpportunityStore>()(
  persist(
    (set, get) => ({
      // Initial state
      opportunities: [],
      selectedOpportunityId: null,

      // Create a new opportunity
      createOpportunity: (input: CreateOpportunityInput) => {
        const now = new Date();
        const newOpportunity: Opportunity = {
          id: crypto.randomUUID(),
          name: input.name,
          description: input.description || '',
          createdAt: now,
          updatedAt: now,
          config: {
            marketName: input.marketName,
          },
          // Use hardcoded scenario as default for now
          scenario: hardcodedScenario,
        };

        set((state) => ({
          opportunities: [...state.opportunities, newOpportunity],
        }));

        return newOpportunity;
      },

      // Delete an opportunity
      deleteOpportunity: (id: string) => {
        set((state) => ({
          opportunities: state.opportunities.filter((opp) => opp.id !== id),
          // Clear selection if deleting selected opportunity
          selectedOpportunityId:
            state.selectedOpportunityId === id ? null : state.selectedOpportunityId,
        }));
      },

      // Update an opportunity
      updateOpportunity: (id: string, updates: Partial<Opportunity>) => {
        set((state) => ({
          opportunities: state.opportunities.map((opp) =>
            opp.id === id
              ? { ...opp, ...updates, updatedAt: new Date() }
              : opp
          ),
        }));
      },

      // Select an opportunity
      selectOpportunity: (id: string | null) => {
        set({ selectedOpportunityId: id });
      },

      // Get a specific opportunity
      getOpportunity: (id: string) => {
        return get().opportunities.find((opp) => opp.id === id);
      },

      // Get the currently selected opportunity
      getSelectedOpportunity: () => {
        const { selectedOpportunityId, opportunities } = get();
        if (!selectedOpportunityId) return undefined;
        return opportunities.find((opp) => opp.id === selectedOpportunityId);
      },
    }),
    {
      name: 'opportunity-storage', // localStorage key
    }
  )
);
