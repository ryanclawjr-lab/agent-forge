'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hexagon, Zap, Users, Store, Layout, Play, 
  Download, Search, Plus, X, Settings, 
  Bot, Network, Layers, Rocket, Star, 
  ChevronRight, Code, Shield, Cpu, Sparkles,
  GitBranch, Wallet, FlaskConical, Eye, Copy, Check
} from 'lucide-react';

// Types
interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  trustScore: number;
  price: number;
  icon: string;
  color: string;
  colorHex: string;
}

// Sample marketplace agents
const marketplaceAgents: Agent[] = [
  { id: '1', name: 'Researcher', description: 'Deep research and analysis with web search', capabilities: ['research', 'analysis', 'web-search'], trustScore: 95, price: 0.01, icon: '🔍', color: 'from-blue-500 to-cyan-500', colorHex: '#06b6d4' },
  { id: '2', name: 'Coder', description: 'Code generation, debugging, and refactoring', capabilities: ['coding', 'debugging', 'refactor'], trustScore: 92, price: 0.02, icon: '💻', color: 'from-green-500 to-emerald-500', colorHex: '#22c55e' },
  { id: '3', name: 'Security', description: 'Security auditing and vulnerability detection', capabilities: ['security', 'audit', 'pentest'], trustScore: 98, price: 0.05, icon: '🛡️', color: 'from-red-500 to-orange-500', colorHex: '#ef4444' },
  { id: '4', name: 'Trader', description: 'DeFi trading automation and strategy execution', capabilities: ['trading', 'defi', 'arbitrage'], trustScore: 88, price: 0.10, icon: '📈', color: 'from-purple-500 to-pink-500', colorHex: '#a855f7' },
  { id: '5', name: 'Analyst', description: 'Data analysis and visualization', capabilities: ['analysis', 'visualization', 'reporting'], trustScore: 90, price: 0.015, icon: '📊', color: 'from-amber-500 to-yellow-500', colorHex: '#f59e0b' },
  { id: '6', name: 'Memory', description: 'Long-term memory and context management', capabilities: ['memory', 'storage', 'context'], trustScore: 94, price: 0.008, icon: '🧠', color: 'from-indigo-500 to-violet-500', colorHex: '#6366f1' },
  { id: '7', name: 'Wallet', description: 'Crypto wallet operations and transactions', capabilities: ['wallet', 'transactions', 'signing'], trustScore: 96, price: 0.025, icon: '💳', color: 'from-cyan-500 to-blue-500', colorHex: '#0ea5e9' },
  { id: '8', name: 'Deployer', description: 'Smart contract deployment and verification', capabilities: ['deployment', 'verification', 'testing'], trustScore: 91, price: 0.03, icon: '🚀', color: 'from-teal-500 to-cyan-500', colorHex: '#14b8a6' },
];

// Pre-built swarms
const prebuiltSwarms = [
  { id: 'research', name: 'Research Swarm', description: 'Deep research pipeline with memory', agents: ['Researcher', 'Memory', 'Analyst'], icon: '🔬', gradient: 'from-blue-600 to-cyan-500' },
  { id: 'trading', name: 'Trading Bot', description: 'Automated DeFi trading with security', agents: ['Trader', 'Security', 'Wallet'], icon: '📈', gradient: 'from-purple-600 to-pink-500' },
  { id: 'devops', name: 'DevOps Agent', description: 'CI/CD and deployment automation', agents: ['Coder', 'Deployer', 'Security'], icon: '🚀', gradient: 'from-emerald-600 to-teal-500' },
  { id: 'audit', name: 'Security Suite', description: 'Comprehensive security auditing', agents: ['Security', 'Coder', 'Analyst'], icon: '🛡️', gradient: 'from-red-600 to-orange-500' },
];

export default function AgentForge() {
  const [activeTab, setActiveTab] = useState<'builder' | 'marketplace' | 'gallery'>('builder');
  const [swarmAgents, setSwarmAgents] = useState<Agent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addToSwarm = useCallback((agent: Agent) => {
    if (!swarmAgents.find(a => a.id === agent.id)) {
      setSwarmAgents([...swarmAgents, agent]);
    }
  }, [swarmAgents]);

  const removeFromSwarm = useCallback((agentId: string) => {
    setSwarmAgents(swarmAgents.filter(a => a.id !== agentId));
  }, [swarmAgents]);

  const runSwarm = useCallback(() => {
    if (swarmAgents.length === 0) return;
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  }, [swarmAgents]);

  const exportSwarm = useCallback(() => {
    const config = {
      name: 'My Swarm',
      agents: swarmAgents.map(a => ({ name: a.name, capabilities: a.capabilities })),
      version: '1.0',
      created: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agentforge-swarm.json';
    a.click();
  }, [swarmAgents]);

  const filteredAgents = marketplaceAgents.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#030307] noise-overlay">
      {/* Animated background */}
      <div className="fixed inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-[#030307]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Hexagon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AgentForge</h1>
              <p className="text-xs text-gray-500">Swarm Builder</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            {[
              { id: 'builder', icon: Layout, label: 'Builder' },
              { id: 'marketplace', icon: Store, label: 'Marketplace' },
              { id: 'gallery', icon: Users, label: 'Gallery' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-400">{swarmAgents.length} agents</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Agent Palette */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold">Add Agents</h2>
                </div>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                  {marketplaceAgents.map(agent => (
                    <motion.button
                      key={agent.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToSwarm(agent)}
                      className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center text-lg`}>
                          {agent.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate group-hover:text-purple-400 transition-colors">
                            {agent.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{agent.description}</div>
                        </div>
                        <Plus className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Swarm Canvas */}
            <div className="lg:col-span-8 space-y-4">
              <div className="glass rounded-2xl p-5 min-h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg font-semibold">Your Swarm</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={runSwarm}
                      disabled={swarmAgents.length === 0 || isRunning}
                      className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ 
                        background: swarmAgents.length > 0 ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(255,255,255,0.1)',
                        boxShadow: swarmAgents.length > 0 ? '0 4px 20px rgba(34, 197, 94, 0.3)' : 'none'
                      }}
                    >
                      <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
                      {isRunning ? 'Running...' : 'Run Swarm'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={exportSwarm}
                      disabled={swarmAgents.length === 0}
                      className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </motion.button>
                  </div>
                </div>

                {swarmAgents.length === 0 ? (
                  <div className="h-80 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-white/10 rounded-2xl">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                      <Layers className="w-10 h-10 opacity-50" />
                    </div>
                    <p className="text-lg font-medium mb-1">Build Your Swarm</p>
                    <p className="text-sm">Add agents from the palette to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {swarmAgents.map((agent, index) => (
                        <motion.div
                          key={agent.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className={`relative p-4 rounded-2xl overflow-hidden`}
                          style={{ 
                            background: `linear-gradient(135deg, ${agent.colorHex}15 0%, ${agent.colorHex}05 100%)`,
                            border: `1px solid ${agent.colorHex}30`
                          }}
                        >
                          {isRunning && (
                            <motion.div 
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
                            />
                          )}
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl`}>
                                {agent.icon}
                              </div>
                              <div>
                                <div className="font-semibold text-lg">{agent.name}</div>
                                <div className="text-sm text-gray-400">{agent.capabilities.join(' • ')}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-medium">{agent.trustScore}</span>
                              </div>
                              <button
                                onClick={() => removeFromSwarm(agent.id)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                              >
                                <X className="w-5 h-5 text-red-400" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {swarmAgents.length > 1 && (
                      <div className="flex items-center justify-center gap-2 py-4 text-gray-500">
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1 max-w-[100px]" />
                        <span className="text-xs">Swarm Coordination Active</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1 max-w-[100px]" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Stats */}
              {swarmAgents.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Agents', value: swarmAgents.length, color: 'text-purple-400', icon: Bot },
                    { label: 'Combined Trust', value: Math.round(swarmAgents.reduce((a, b) => a + b.trustScore, 0) / swarmAgents.length) || 0, color: 'text-cyan-400', icon: Shield },
                    { label: 'Est. Cost', value: `$${swarmAgents.reduce((a, b) => a + b.price, 0).toFixed(3)}`, color: 'text-green-400', icon: Wallet },
                  ].map((stat, i) => (
                    <div key={i} className="glass rounded-2xl p-4 text-center">
                      <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search agents by name, capability..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredAgents.map(agent => (
                <motion.div
                  key={agent.id}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-5 card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {agent.icon}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      {agent.trustScore}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">{agent.name}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{agent.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {agent.capabilities.map(cap => (
                      <span key={cap} className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-400">
                        {cap}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-purple-400 font-semibold">${agent.price}/run</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        addToSwarm(agent);
                        setActiveTab('builder');
                      }}
                      className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 font-medium hover:bg-purple-500/30 transition-colors"
                    >
                      Add
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                <Rocket className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Pre-built Swarms</h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Ready-to-deploy swarm configurations. Import, customize, and launch in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prebuiltSwarms.map((swarm) => (
                <motion.div
                  key={swarm.id}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-6 card-hover cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${swarm.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {swarm.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{swarm.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">{swarm.description}</p>
                      <div className="flex items-center gap-2">
                        {swarm.agents.map((agent, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-white/10 text-xs">{agent}</span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
