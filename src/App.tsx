import React, { useState, useMemo } from 'react';
import { ForecasterInputs, CurrencyCode } from './types';
import { CURRENCIES, NAMASTARK_CONSTANT, PRESET_SCENARIOS } from './data/constants';
import { calculateNamastarkROAS } from './utils/mathEngine';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CalculatorSection } from './components/CalculatorSection';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { DeepMethodology } from './components/DeepMethodology';
import { AuthorAndReferences } from './components/AuthorAndReferences';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ExportModal } from './components/ExportModal';

export default function App() {
  // Default canonical state from Saul Miron Stark's whitepaper:
  // Spend: R4,000 | CPC: R60 | Form CVR: 10% | Close Rate: 15% | Rev per client: R50,000 | Constant N0 = 0.6624
  const [inputs, setInputs] = useState<ForecasterInputs>({
    adSpend: 4000,
    cpc: 60,
    leadConversionRate: 10,
    closeRate: 15,
    revenuePerClient: 50000,
    mode: 'constant',
    customCoefficient: 0.70,
    currency: 'ZAR',
  });

  const [activePresetId, setActivePresetId] = useState<string | null>('whitepaper-canonical');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Compute live results
  const results = useMemo(() => {
    return calculateNamastarkROAS(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof ForecasterInputs, value: any) => {
    setActivePresetId(null);
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCurrencyChange = (currency: CurrencyCode) => {
    setActivePresetId(null);
    const config = CURRENCIES[currency];
    setInputs((prev) => {
      // If switching currencies and still at default ratios, scale values appropriately
      if (prev.currency === 'ZAR' && currency !== 'ZAR') {
        return {
          ...prev,
          currency,
          adSpend: config.defaultSpend,
          cpc: config.defaultCpc,
          revenuePerClient: config.defaultRevenuePerClient,
        };
      } else if (currency === 'ZAR' && prev.currency !== 'ZAR') {
        return {
          ...prev,
          currency,
          adSpend: config.defaultSpend,
          cpc: config.defaultCpc,
          revenuePerClient: config.defaultRevenuePerClient,
        };
      }
      return {
        ...prev,
        currency,
      };
    });
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_SCENARIOS.find((p) => p.id === presetId);
    if (preset) {
      setActivePresetId(presetId);
      setInputs({
        ...preset.inputs,
      });
    }
  };

  const handleResetToDefaults = () => {
    setActivePresetId('whitepaper-canonical');
    setInputs({
      adSpend: 4000,
      cpc: 60,
      leadConversionRate: 10,
      closeRate: 15,
      revenuePerClient: 50000,
      mode: 'constant',
      customCoefficient: 0.70,
      currency: 'ZAR',
    });
  };

  const scrollToTool = () => {
    const el = document.getElementById('forecaster-tool');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-sky-500/20 selection:text-sky-900 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        currentCurrency={inputs.currency}
        onCurrencyChange={handleCurrencyChange}
        onSelectPreset={handleApplyPreset}
        onExportReport={() => setIsExportOpen(true)}
        activePresetId={activePresetId}
      />

      {/* 1. Header & Hero Section */}
      <main className="flex-1">
        <HeroSection onScrollToTool={scrollToTool} />

        {/* 2. Interactive Tool: The Namastark ROAS Forecaster */}
        <CalculatorSection
          inputs={inputs}
          results={results}
          activePresetId={activePresetId}
          onInputChange={handleInputChange}
          onApplyPreset={handleApplyPreset}
          onResetToDefaults={handleResetToDefaults}
        />

        {/* 3. Executive Summary / Definition Card */}
        <ExecutiveSummary />

        {/* 4. Mathematical Formulation & Deep Methodology */}
        <DeepMethodology />

        {/* 5. Author, IP Credit & Citations */}
        <AuthorAndReferences />

        {/* 6. Direct Contact & Advisory Consultation Form */}
        <ContactSection inputs={inputs} results={results} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Export & Audit Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        inputs={inputs}
        results={results}
      />
    </div>
  );
}
