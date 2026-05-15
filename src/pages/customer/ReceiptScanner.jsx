import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, ScanLine, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import Badge from '../../components/Badge';
import { staggerContainer, staggerItem, fadeUp, scaleIn } from '../../utils/animations';

const ReceiptScanner = () => {
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'results'

  const handleScan = () => {
    setScanState('scanning');
    // Simulate scan duration
    setTimeout(() => {
      setScanState('results');
    }, 3000);
  };

  const resetScanner = () => {
    setScanState('idle');
  };

  const receiptData = {
    merchant: "Tesco Extra",
    date: "14 May 2026",
    time: "14:32",
    total: 34.50,
    items: [
      { name: "Organic Whole Milk 2L", price: 1.80, category: "Groceries" },
      { name: "Sourdough Bread", price: 2.20, category: "Bakery" },
      { name: "Free Range Eggs 12pk", price: 3.50, category: "Groceries" },
      { name: "Colombian Coffee Beans", price: 5.50, category: "Beverages" },
      { name: "Avocados 4pk", price: 2.80, category: "Produce" },
      { name: "Atlantic Salmon Fillets", price: 8.50, category: "Meat & Fish" },
      { name: "Laundry Detergent 1.5L", price: 7.00, category: "Household" },
      { name: "Reusable Carrier Bag", price: 3.20, category: "Misc" }
    ]
  };

  return (
    <motion.div 
      variants={staggerContainer} 
      initial="hidden" 
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto', height: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>Receipt Scanner</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Digitise and itemise your physical receipts instantly.</p>
        </div>
        {scanState === 'results' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={resetScanner}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            Scan Another
          </motion.button>
        )}
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          {scanState === 'idle' && (
            <motion.div
              key="idle"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '16px',
                border: '2px dashed var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '64px 32px',
                minHeight: '400px',
                gap: '24px',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'color-mix(in srgb, var(--teal) 15%, transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--teal)'
              }}>
                <FileText size={40} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Upload or Capture Receipt</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                  Take a photo of your receipt or upload an existing image. Our AI will extract the items and categorise them automatically.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScan}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--teal)',
                    color: 'var(--bg-primary)',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Camera size={18} />
                  Take Photo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'color-mix(in srgb, var(--bg-card-lt) 50%, transparent)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScan}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    border: '1px solid var(--border)',
                    cursor: 'pointer'
                  }}
                >
                  <Upload size={18} />
                  Upload Image
                </motion.button>
              </div>
            </motion.div>
          )}

          {scanState === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.2 } }}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '64px 32px',
                minHeight: '400px',
                gap: '32px'
              }}
            >
              <div style={{ position: 'relative', width: '200px', height: '280px', backgroundColor: 'var(--bg-card-lt)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                {/* Mock receipt document lines */}
                <div style={{ padding: '24px' }}>
                  <div style={{ height: '12px', width: '60%', backgroundColor: 'var(--border)', borderRadius: '4px', marginBottom: '24px', margin: '0 auto' }}></div>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ height: '8px', width: '50%', backgroundColor: 'var(--border)', borderRadius: '4px' }}></div>
                      <div style={{ height: '8px', width: '20%', backgroundColor: 'var(--border)', borderRadius: '4px' }}></div>
                    </div>
                  ))}
                  <div style={{ height: '2px', width: '100%', backgroundColor: 'var(--border)', margin: '16px 0' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ height: '12px', width: '30%', backgroundColor: 'var(--border)', borderRadius: '4px' }}></div>
                    <div style={{ height: '12px', width: '30%', backgroundColor: 'var(--border)', borderRadius: '4px' }}></div>
                  </div>
                </div>

                {/* Scanning line animation */}
                <motion.div
                  animate={{ y: [0, 280, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--teal)',
                    boxShadow: '0 0 16px 4px color-mix(in srgb, var(--teal) 50%, transparent)',
                    zIndex: 10
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal)', fontWeight: '600' }}
                >
                  <ScanLine size={20} />
                  Analysing Receipt...
                </motion.div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Extracting items, prices, and categorising your purchase.</p>
              </div>
            </motion.div>
          )}

          {scanState === 'results' && (
            <motion.div
              key="results"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                {/* Receipt Details Card */}
                <motion.div
                  variants={staggerItem}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    padding: '32px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <CheckCircle2 size={24} color="var(--green)" />
                        <h3 style={{ fontSize: '24px', fontWeight: '700' }}>{receiptData.merchant}</h3>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{receiptData.date} at {receiptData.time}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px' }}>Total Amount</p>
                      <h4 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--teal)' }}>£{receiptData.total.toFixed(2)}</h4>
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <h5 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Itemised Breakdown</h5>
                    
                    <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {receiptData.items.map((item, index) => (
                        <motion.div 
                          key={index}
                          variants={staggerItem}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            backgroundColor: 'var(--bg-card-lt)',
                            borderRadius: '8px',
                            border: '1px solid var(--border)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ 
                              width: '40px', height: '40px', borderRadius: '8px', 
                              backgroundColor: 'color-mix(in srgb, var(--blue) 15%, transparent)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'var(--blue)', fontWeight: '600', fontSize: '12px'
                            }}>
                              {item.category.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                              <Badge label={item.category} color="var(--blue)" />
                            </div>
                          </div>
                          <div style={{ fontWeight: '600' }}>
                            £{item.price.toFixed(2)}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        flex: 1,
                        padding: '16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--teal)',
                        color: 'var(--bg-primary)',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '15px'
                      }}
                    >
                      Save to Expenses
                    </motion.button>
                  </div>
                </motion.div>

                {/* Info Card */}
                <motion.div
                  variants={staggerItem}
                  style={{
                    width: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{
                    backgroundColor: 'color-mix(in srgb, var(--blue) 10%, transparent)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid color-mix(in srgb, var(--blue) 20%, transparent)'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--blue)', marginBottom: '8px' }}>Smart Categorisation</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Sanctum AI automatically groups your purchases into relevant categories to give you precise insights into your spending habits.
                    </p>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid var(--border)'
                  }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Category Summary</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Groceries</span>
                        <span style={{ fontWeight: '600' }}>£5.30</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Meat & Fish</span>
                        <span style={{ fontWeight: '600' }}>£8.50</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Household</span>
                        <span style={{ fontWeight: '600' }}>£7.00</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Beverages</span>
                        <span style={{ fontWeight: '600' }}>£5.50</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Other</span>
                        <span style={{ fontWeight: '600' }}>£8.20</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ReceiptScanner;
