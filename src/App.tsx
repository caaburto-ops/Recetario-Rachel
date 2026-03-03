import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, Users, ChevronRight, Utensils, Heart, Filter, BookOpen, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from './lib/utils';

interface Recipe {
  id: string;
  title: string;
  category: string;
  time?: string;
  servings?: number;
  difficulty?: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  description: string;
  calories: string;
  macros: {
    p: string;
    c: string;
    g: string;
  };
}

const RECIPES: Recipe[] = [
  // FASE 1
  {
    id: '1',
    title: 'Chai Latte Bariátrico',
    category: 'Fase 1',
    image: 'https://lh3.googleusercontent.com/d/1hda86ckG15bNBg3VhL9Id4cAoIAtJlTB',
    description: 'Infusión de té chai en leche descremada, ideal para la fase líquida láctea.',
    ingredients: ['100 g leche descremada (0–1% grasa)', '1 bolsita de té chai'],
    instructions: [
      'Calentar la leche en un recipiente antiadherente hasta alcanzar aproximadamente 75 °C, evitando ebullición para preservar proteínas séricas y minimizar formación de espuma excesiva.',
      'Retirar del fuego e infusionar la bolsita de té durante 5 minutos.',
      'Remover suavemente y colar si es necesario.',
      'Consumir tibio, en sorbos pequeños, favoreciendo tolerancia gástrica y evitando distensión.'
    ],
    calories: '35 kcal',
    macros: { p: '3.4 g', c: '5.0 g', g: '0.2 g' }
  },
  {
    id: '2',
    title: 'Vainilla Latte',
    category: 'Fase 1',
    image: 'https://lh3.googleusercontent.com/d/1AH5e-1sDvAEZ2e_j2_ndGv2Js_lmeYgP',
    description: 'Café descafeinado con un toque de vainilla y leche descremada.',
    ingredients: ['120 g leche descremada', '1 g café descafeinado', 'Endulzante no calórico', '2 ml esencia de vainilla'],
    instructions: [
      'Calentar la leche hasta temperatura tibia (70–75 °C).',
      'Incorporar el café descafeinado previamente disuelto en pequeña cantidad de leche caliente para evitar grumos.',
      'Añadir esencia de vainilla y endulzante según preferencia.',
      'Mezclar homogéneamente y consumir en volumen fraccionado, manteniendo pausas entre sorbos para optimizar vaciamiento gástrico controlado.'
    ],
    calories: '42 kcal',
    macros: { p: '4.1 g', c: '6.0 g', g: '0.3 g' }
  },
  {
    id: '3',
    title: 'Vainilla Protein',
    category: 'Fase 1',
    image: 'https://lh3.googleusercontent.com/d/1EECuabuCBHP_t1qLKy2EtKUgnY3YNcWI',
    description: 'Bebida proteica de vainilla para prevenir la pérdida de masa magra.',
    ingredients: ['120 g leche descremada', '15 g whey protein sin sabor (½ scoop estándar)', 'Endulzante', 'Esencia de vainilla'],
    instructions: [
      'Calentar la leche hasta 60 °C máximo y retirar del fuego.',
      'Disolver el whey protein en pequeña cantidad de leche tibia para evitar coagulación.',
      'Incorporar al volumen total mezclando con batidor manual hasta homogeneizar.',
      'Esta preparación aumenta densidad proteica sin incrementar volumen, estrategia clave en prevención de pérdida de masa magra temprana postoperatoria.'
    ],
    calories: '102 kcal',
    macros: { p: '15.3 g', c: '6.0 g', g: '0.4 g' }
  },
  {
    id: '4',
    title: 'Golden Milk Proteica',
    category: 'Fase 1',
    image: 'https://lh3.googleusercontent.com/d/18t24SO45V--oaA6tfw7imi_ez-d6p5m9',
    description: 'Leche dorada con cúrcuma y proteína, rica en compuestos bioactivos.',
    ingredients: ['150 g leche descremada', '15 g whey protein', '1 g cúrcuma', '1 g canela', '0.5 g jengibre'],
    instructions: [
      'Calentar la leche junto a las especias durante 3–4 minutos a fuego bajo para favorecer liberación de compuestos bioactivos como curcuminoides.',
      'Retirar, dejar entibiar a menos de 60 °C y añadir el whey protein previamente disuelto.',
      'Mezclar vigorosamente hasta textura uniforme.',
      'Consumir lentamente, priorizando control de volumen ingerido.'
    ],
    calories: '128 kcal',
    macros: { p: '17.5 g', c: '7.5 g', g: '0.5 g' }
  },
  // FASE 2
  {
    id: '5',
    title: 'Papilla Cremosa Pollo al Curry',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/12vM79_j59im3cHAqIl9anaJBtZnILl-e',
    description: 'Papilla nutritiva de pollo con curry, papa y zapallo.',
    ingredients: ['60 g pechuga pollo cocida', '20 g papa cocida', '20 g zapallo cocido', '4.5 g aceite oliva', '1 g curry'],
    instructions: [
      'Cocer la pechuga en agua sin grasa añadida hasta alcanzar 74 °C internos.',
      'Cocer papa y zapallo por separado para controlar textura y contenido hídrico.',
      'Procesar todos los ingredientes con 80 ml de agua de cocción hasta lograr consistencia homogénea, sin grumos ni fibras visibles.',
      'Añadir aceite al final para preservar ácidos grasos monoinsaturados y mejorar absorción de carotenoides.'
    ],
    calories: '178 kcal',
    macros: { p: '17.8 g', c: '7.2 g', g: '8.3 g' }
  },
  {
    id: '6',
    title: 'Papilla Carne Verde Sazón',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1qa-vf4LdpdBJG5oCPhPfgZEH_nWRia4O',
    description: 'Papilla de carne magra con quinoa y espinaca.',
    ingredients: ['60 g posta rosada magra cocida', '15 g quinoa cocida', '20 g espinaca cocida', '4.5 g aceite oliva'],
    instructions: [
      'Cocer carne magra sin grasa visible hasta punto bien cocido.',
      'Cocer quinoa previamente lavada hasta gelatinización completa del almidón.',
      'Integrar espinaca cocida para aporte de folatos y hierro no hemo.',
      'Procesar con agua de cocción hasta textura uniforme, evitando fibras residuales. Añadir aceite posterior al triturado para mejorar densidad energética controlada.'
    ],
    calories: '196 kcal',
    macros: { p: '19.5 g', c: '6.5 g', g: '9.1 g' }
  },
  {
    id: '7',
    title: 'Papilla del Mar',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/17IUQGq7J0N4bAvPdIEnoaqBwjGiViKiH',
    description: 'Papilla suave de merluza con zapallito y cuscús.',
    ingredients: ['60 g merluza cocida', '30 g zapallito', '15 g cuscús cocido', '4.5 g aceite oliva'],
    instructions: [
      'Cocer la merluza en agua con romero durante 10 minutos.',
      'Añadir zapallito picado y continuar cocción hasta ablandar.',
      'Hidratar cuscús con agua caliente y mezclar.',
      'Procesar todo hasta obtener textura completamente lisa, sin espinas ni fibras. Incorporar aceite al final para aumentar aporte energético sin elevar volumen.'
    ],
    calories: '162 kcal',
    macros: { p: '16.4 g', c: '8.0 g', g: '6.8 g' }
  },
  {
    id: '8',
    title: 'Papilla Proteica Avanzada',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1j5iM2VaqDmbskBwQbdk34KxfSiTiZRo6',
    description: 'Alta concentración de proteína en bajo volumen con pollo y quinoa.',
    ingredients: ['50 g pechuga pollo', '15 g quinoa cocida', '15 g whey protein', '4.5 g aceite oliva'],
    instructions: [
      'Cocer pollo hasta temperatura segura.',
      'Procesar con quinoa cocida y 80 ml de agua de cocción hasta lograr textura completamente homogénea.',
      'Dejar entibiar bajo 60 °C y añadir whey protein disuelto previamente para evitar desnaturalización excesiva.',
      'Integrar aceite al final. Esta preparación concentra proteína en bajo volumen, ideal para metas ≥20 g por toma.'
    ],
    calories: '224 kcal',
    macros: { p: '28.2 g', c: '6.0 g', g: '9.0 g' }
  },
  {
    id: '9',
    title: 'Espuma de Frutilla Proteica',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1jGJVLu1eVXMnoWJox929ffmh3JyEMrxo',
    description: 'Postre aireado de frutilla con claras de huevo y alulosa.',
    ingredients: ['100 g frutillas cocidas', '66 g claras de huevo (2 claras grandes)', '50 g alulosa en polvo', '60 ml agua de cocción'],
    instructions: [
      'Cocer las frutillas hasta ablandar completamente y procesarlas con parte del líquido de cocción hasta obtener un puré fino sin semillas perceptibles.',
      'Paralelamente, llevar las claras con alulosa a baño maría hasta 60–65 °C, asegurando disolución completa del endulzante y reducción de carga microbiológica.',
      'Batir hasta punto nieve firme.',
      'Incorporar gradualmente el puré tibio con movimientos envolventes para mantener estructura aireada. Refrigerar 30 minutos antes de consumir.'
    ],
    calories: '112 kcal',
    macros: { p: '8.2 g', c: '18.4 g', g: '0.3 g' }
  },
  {
    id: '10',
    title: 'Espuma Manzana Canela',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1N9ZhJDH7LKxcmJwnCdqBtfYzjpM0FEaE',
    description: 'Merengue suizo con compota de manzana y canela.',
    ingredients: ['60 g compota de manzana sin azúcar', '66 g claras de huevo', '50 g alulosa', 'Canela c/s'],
    instructions: [
      'Preparar merengue suizo llevando claras y alulosa a baño maría hasta 60 °C.',
      'Batir hasta obtener estructura estable.',
      'Añadir compota previamente procesada hasta textura totalmente lisa.',
      'Incorporar canela y continuar batiendo hasta homogeneizar. Refrigerar.'
    ],
    calories: '118 kcal',
    macros: { p: '8.1 g', c: '21 g', g: '0.2 g' }
  },
  {
    id: '11',
    title: 'Milkshake Proteico',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1Rvg7qqfnVXvHygwB3KtXxOf2VElBGnJj',
    description: 'Batido de vainilla y frutilla con alta carga proteica.',
    ingredients: ['150 g leche descremada sabor vainilla sin azúcar', '30 g frutillas cocidas', '15 g whey protein'],
    instructions: [
      'Entibiar ligeramente la leche si se desea mejorar tolerancia digestiva.',
      'Procesar junto a frutillas previamente cocidas y enfriadas para disminuir carga osmótica y riesgo de dumping.',
      'Añadir whey protein y licuar hasta textura homogénea sin espuma excesiva.',
      'Consumir lentamente en no menos de 20 minutos.'
    ],
    calories: '156 kcal',
    macros: { p: '20.1 g', c: '10.2 g', g: '0.6 g' }
  },
  {
    id: '12',
    title: 'Porridge Proteico Licuado',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1GgPEPMKkhGAb2zwTX4i-f5xZkBSNJI3S',
    description: 'Avena cocida con leche y proteína, procesada para textura lisa.',
    ingredients: ['150 g leche descremada', '20 g avena tradicional', '30 g compota manzana', '15 g whey protein'],
    instructions: [
      'Cocer la avena en la leche a fuego bajo hasta gelatinización completa del almidón (mínimo 5 minutos).',
      'Añadir compota sin azúcar y cocinar 1 minuto adicional.',
      'Procesar hasta textura completamente lisa para evitar residuos fibrosos.',
      'Enfriar bajo 60 °C e incorporar whey protein disuelto previamente.'
    ],
    calories: '232 kcal',
    macros: { p: '19.6 g', c: '28 g', g: '4.2 g' }
  },
  {
    id: '13',
    title: 'Smoothie Yogurt Proteico',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1SLA1GminEDg4VT-GqUtKkZr-wXe_T85u',
    description: 'Yogurt proteico con frutillas y avena licuada.',
    ingredients: ['170 g yogurt proteico natural sin azúcar', '30 g frutillas cocidas', '10 g avena'],
    instructions: [
      'Procesar yogurt con frutillas previamente cocidas para reducir acidez y mejorar tolerancia.',
      'Añadir avena y licuar hasta eliminar completamente partículas visibles.',
      'Ajustar consistencia con agua si es necesario.',
      'Consumir frío moderado, evitando temperaturas extremas que puedan generar molestias gástricas tempranas.'
    ],
    calories: '178 kcal',
    macros: { p: '18.4 g', c: '16 g', g: '2.5 g' }
  },
  {
    id: '14',
    title: 'Pudín de Chocolate Proteico',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/19jU14rOp2pVD6Zjb5wuzj1bOfdtJRnOx',
    description: 'Pudín cremoso de cacao y proteína.',
    ingredients: ['100 g leche descremada', '5 g cacao amargo sin azúcar', '15 g whey protein', 'Endulzante no calórico'],
    instructions: [
      'Calentar leche con cacao hasta integrar completamente el polvo, evitando ebullición.',
      'Retirar y dejar entibiar bajo 60 °C.',
      'Añadir whey protein previamente disuelto para evitar grumos.',
      'Mezclar vigorosamente hasta lograr textura cremosa uniforme. Refrigerar mínimo 1 hora para mejorar consistencia.'
    ],
    calories: '124 kcal',
    macros: { p: '17.3 g', c: '7 g', g: '1.6 g' }
  },
  {
    id: '15',
    title: 'Pudín Vainilla Proteico',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1HsqM5QSTsq78qPPulw8mphpX6KQFkHac',
    description: 'Colación nocturna rica en proteína de absorción rápida.',
    ingredients: ['100 g leche descremada sabor vainilla sin azúcar', '15 g whey protein'],
    instructions: [
      'Calentar leche suavemente y retirar antes de ebullición.',
      'Entibiar y añadir proteína disuelta.',
      'Mezclar hasta homogeneizar completamente.',
      'Refrigerar hasta espesar levemente. Ideal como colación nocturna rica en proteína de absorción relativamente rápida.'
    ],
    calories: '118 kcal',
    macros: { p: '16.5 g', c: '6 g', g: '0.5 g' }
  },
  // FASE 3
  {
    id: '16',
    title: 'Pollo al Curry con Puré Anaranjado',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/1H_YcDZXJLWbqFjMRGvQbaWjqWIqmWhGs',
    description: 'Pollo en cubos pequeños con yogurt y puré de papa y zapallo.',
    ingredients: ['80 g pechuga de pollo cocida', '30 g yogurt natural descremado', '30 g leche de coco light', '20 g papa cocida', '30 g zapallo camote cocido', '4.5 g aceite de oliva', 'Curry y sal'],
    instructions: [
      'Sellar el pollo en sartén antiadherente sin grasa añadida hasta alcanzar temperatura interna segura (74 °C). Cortar en cubos pequeños (<1 cm).',
      'Mezclar fuera del fuego con yogurt y leche de coco para lograr textura húmeda y fácil de deglutir.',
      'Paralelamente, triturar papa y zapallo hasta obtener puré homogéneo, incorporando aceite al final.',
      'Servir en porciones pequeñas, priorizando proteína primero.'
    ],
    calories: '285 kcal',
    macros: { p: '27.8 g', c: '12.5 g', g: '13.4 g' }
  },
  {
    id: '17',
    title: 'Budín de Zapallito con Atún',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/155Ikpq-ej7u2O2kuJfmSoJAE74wq5vsh',
    description: 'Budín horneado de atún y zapallito italiano.',
    ingredients: ['66 g claras de huevo (2 claras)', '60 g atún al agua drenado', '100 g zapallito italiano cocido y escurrido', '100 g papa cocida (opcional)'],
    instructions: [
      'Rallar zapallito and cocer brevemente para ablandar fibras, escurrir completamente para evitar exceso hídrico.',
      'Batir claras hasta punto nieve leve.',
      'Incorporar zapallito frío and atún desmenuzado con movimientos envolventes.',
      'Hornear a 180 °C por 20 minutos hasta coagulación completa. Servir en porciones pequeñas and textura húmeda.'
    ],
    calories: '182 kcal',
    macros: { p: '29.1 g', c: '3.2 g', g: '2.4 g' }
  },
  {
    id: '18',
    title: 'Omelette Espinaca y Jamón',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/1DFOV6kvoXE41l8BInBhYDQJ6quSEmJtf',
    description: 'Omelette de claras con jamón de pavo y espinaca.',
    ingredients: ['66 g claras de huevo', '40 g jamón de pavo bajo sodio', '40 g espinaca cocida', '40 g quinoa cocida (acompañamiento)'],
    instructions: [
      'Cocer espinaca y escurrir completamente.',
      'Batir claras suavemente para evitar aire excesivo.',
      'Incorporar jamón picado fino y espinaca fría.',
      'Cocinar a fuego bajo en sartén antiadherente hasta coagulación total de las claras. Doblar sin romper. Servir con quinoa bien cocida y húmeda para facilitar masticación.'
    ],
    calories: '245 kcal',
    macros: { p: '30.4 g', c: '14 g', g: '3.6 g' }
  },
  {
    id: '19',
    title: 'Pavo Molido con Champiñones',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/1tjWm7_ZnrsFAf_-uHi-9Kx5bacfDRYYS',
    description: 'Pavo molido cremoso con champiñones y pasta fina.',
    ingredients: ['80 g pavo molido magro cocido', '60 g champiñones', '15 g yogurt natural', '15 g leche descremada', '40 g pasta cabello de ángel cocida'],
    instructions: [
      'Cocinar pavo a fuego medio hasta punto completamente cocido.',
      'Añadir champiñones picados finos y cocinar hasta ablandar.',
      'Incorporar yogurt y leche fuera del fuego para generar textura cremosa.',
      'Servir con pasta muy bien cocida, cortada en trozos pequeños para evitar impactación alimentaria.'
    ],
    calories: '310 kcal',
    macros: { p: '29.8 g', c: '22 g', g: '9 g' }
  },
  {
    id: '20',
    title: 'Croquetas de Atún',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/1j12E9a-U34Ry68W3jKNmhESujBmTUl1y',
    description: 'Croquetas horneadas de atún con avena.',
    ingredients: ['120 g atún al agua drenado', '33 g clara de huevo (1 clara)', '20 g avena', 'Especias'],
    instructions: [
      'Mezclar atún completamente escurrido con clara y avena fina.',
      'Formar croquetas pequeñas (<4 cm diámetro).',
      'Cocinar en sartén antiadherente a fuego medio-bajo hasta coagulación total interna.',
      'Mantener textura húmeda, evitando tostado excesivo que dificulte masticación.'
    ],
    calories: '295 kcal',
    macros: { p: '39.5 g', c: '13 g', g: '4.8 g' }
  },
  {
    id: '21',
    title: 'Boloñesa con Pasta',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/1SkI2353DCqnTxkTY7mZbGXbeRqQBttg6',
    description: 'Carne molida magra con tomate natural y pasta.',
    ingredients: ['80 g carne molida 3% grasa cocida', '100 g tomate natural cocido', '60 g pasta cocida', '4.5 g aceite oliva'],
    instructions: [
      'Cocinar carne hasta completa cocción sin dejar zonas rosadas.',
      'Añadir tomate sin piel ni semillas y reducir hasta textura espesa.',
      'Incorporar aceite al final.',
      'Servir con pasta muy bien cocida y cortada en trozos pequeños. Priorizar proteína antes de carbohidrato.'
    ],
    calories: '410 kcal',
    macros: { p: '32 g', c: '34 g', g: '16 g' }
  },
  {
    id: '22',
    title: 'Reineta al Limón con Arroz',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/1H1eYe0l2GhKQsLMP6Pud_W6NSD0wUPbl',
    description: 'Pescado blanco al horno con arroz basmati.',
    ingredients: ['80 g reineta cocida', '45 g arroz basmati cocido', '4.5 g aceite oliva', 'Jugo limón'],
    instructions: [
      'Hornear pescado hasta 63 °C internos. Desmenuzar en trozos pequeños.',
      'Servir con arroz muy bien cocido y húmedo para facilitar deglución.',
      'Añadir aceite al final para aumentar densidad calórica sin aumentar volumen.'
    ],
    calories: '285 kcal',
    macros: { p: '23.4 g', c: '23 g', g: '9 g' }
  },
  {
    id: '23',
    title: 'Tartar de Salmón',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/1VDMt6-QJd5Tb1LGUkLJrES5NSYzMy691',
    description: 'Salmón fresco en cubos pequeños con palta.',
    ingredients: ['120 g salmón fresco', '50 g palta', '4 g aceite oliva', 'Vegetales picados finos'],
    instructions: [
      'Cortar salmón en cubos pequeños asegurando cadena de frío adecuada.',
      'Mezclar con vegetales picados finamente para facilitar masticación.',
      'Añadir aceite y jugo de limón.',
      'Refrigerar 15 minutos antes de servir. Consumir lentamente priorizando proteína.'
    ],
    calories: '395 kcal',
    macros: { p: '26 g', c: '5 g', g: '32 g' }
  },
  {
    id: '24',
    title: 'Lasaña de Berenjena',
    category: 'Fase 3',
    image: 'https://lh3.googleusercontent.com/d/1HNQCPGLvmLB02H1S72mi5f2DZnbA8ikT',
    description: 'Capas de berenjena con carne molida y mozzarella light.',
    ingredients: ['200 g berenjena', '80 g carne molida magra', '60 g salsa tomate sin azúcar', '40 g queso mozzarella light'],
    instructions: [
      'Sellar láminas de berenjena para reducir humedad.',
      'Cocinar carne completamente y mezclar con salsa.',
      'Armar capas alternando berenjena y carne, añadir queso al final.',
      'Hornear 20 minutos hasta gratinar ligeramente. Cortar porciones pequeñas.'
    ],
    calories: '430 kcal',
    macros: { p: '33 g', c: '18 g', g: '26 g' }
  }
];

const CATEGORIES = ['Todas', 'Fase 1', 'Fase 2', 'Fase 3'];

const RecipeCard = ({ recipe, onClick }: { recipe: Recipe, onClick: () => void }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-stone-100 group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
            <Heart size={18} className="text-stone-400 hover:text-red-500 transition-colors" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-stone-800">
            {recipe.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 group-hover:text-olive transition-colors">{recipe.title}</h3>
        <p className="text-stone-500 text-sm line-clamp-2 mb-4 leading-relaxed">{recipe.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-stone-50">
          <div className="flex items-center gap-4 text-stone-400">
            <div className="flex items-center gap-1.5">
              <Utensils size={14} />
              <span className="text-xs font-medium">{recipe.calories}</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-stone-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const RecipeDetail = ({ recipe, onClose }: { recipe: Recipe, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-stone-900/40 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto bg-stone-50/30">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-stone-500 hover:text-olive transition-colors group"
            >
              <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Volver al recetario</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors hidden md:block"
            >
              <X size={24} className="text-stone-400" />
            </button>
          </div>
          
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-olive mb-4 block">
            {recipe.category}
          </span>
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">{recipe.title}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-8 border-b border-stone-200">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Calorías</span>
              <div className="flex items-center gap-2 text-stone-800">
                <span className="font-medium">{recipe.calories}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Proteínas</span>
              <div className="flex items-center gap-2 text-stone-800">
                <span className="font-medium">{recipe.macros.p}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Carbohidratos</span>
              <div className="flex items-center gap-2 text-stone-800">
                <span className="font-medium">{recipe.macros.c}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Grasas</span>
              <div className="flex items-center gap-2 text-stone-800">
                <span className="font-medium">{recipe.macros.g}</span>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h4 className="text-lg font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-olive rounded-full" />
                Ingredientes
              </h4>
              <ul className="grid grid-cols-1 gap-3">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                    <span className="text-sm">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-olive rounded-full" />
                Preparación
              </h4>
              <div className="space-y-6">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-olive/10 text-olive text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm text-stone-600 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-stone-200">
              <button 
                onClick={onClose}
                className="w-full py-4 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group"
              >
                <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
                Volver al recetario
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase()) || 
                           recipe.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'Todas' || recipe.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-paper text-stone-900 font-sans selection:bg-olive/10 selection:text-olive">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-olive rounded-xl flex items-center justify-center text-white shadow-lg shadow-olive/20">
              <BookOpen size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">Nutricionista Rachel Benchimol</h1>
              <p className="text-[10px] text-olive font-medium uppercase tracking-wider mt-1">Programa de Transformación Bariátrica</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
            <a href="#" className="text-stone-900 border-b-2 border-olive pb-1">Recetario</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Contacto</a>
          </div>
          <button className="p-2 hover:bg-stone-100 rounded-full transition-colors md:hidden">
            <Search size={20} className="text-stone-500" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section - Refocused on Recetario */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-olive/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-olive mb-8"
            >
              <BookOpen size={12} />
              Recetario Especializado Rachel Benchimol
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-stone-900 leading-[1.1] tracking-tight text-balance">
              Tu guía nutricional <br /> 
              <span className="text-olive italic font-serif font-normal">paso a paso.</span>
            </h2>
            
            <p className="text-xl text-stone-600 mb-10 max-w-xl leading-relaxed">
              Más de 20 recetas detalladas con aporte nutricional exacto, diseñadas para acompañarte en cada fase de tu recuperación: desde la dieta líquida hasta la alimentación sólida.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto px-8 py-4 bg-olive text-white rounded-xl font-bold text-lg hover:bg-olive/90 transition-all shadow-xl shadow-olive/20 flex items-center justify-center gap-2 group">
                Explorar Recetas por Fase
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="Paciente" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  <span className="text-stone-900 font-bold">+1000 pacientes</span> confían en este recetario
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/155Ikpq-ej7u2O2kuJfmSoJAE74wq5vsh" 
              alt="Budín de Zapallito con Atún" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="px-3 py-1 bg-olive rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Destacado Fase 3
                </div>
                <div className="flex items-center gap-1 text-xs font-medium">
                  <Utensils size={12} />
                  182 kcal
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold">Budín de Zapallito con Atún</h3>
              <p className="text-sm text-white/80 mt-2">Budín horneado de atún y zapallito italiano, textura perfecta para tu recuperación.</p>
            </div>
          </motion.div>
        </section>

        {/* Search & Filter */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text"
                placeholder="Busca recetas por fase o ingrediente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 focus:border-olive transition-all text-sm shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold transition-all",
                    activeCategory === cat 
                      ? "bg-stone-900 text-white shadow-lg shadow-stone-200" 
                      : "bg-white text-stone-500 border border-stone-100 hover:bg-stone-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => setSelectedRecipe(recipe)} 
              />
            ))}
          </AnimatePresence>
        </section>


        {filteredRecipes.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">No encontramos recetas</h3>
            <p className="text-stone-500">Intenta buscar con otros términos o categorías.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-16 px-6 mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-olive rounded-lg flex items-center justify-center text-white">
                <BookOpen size={16} />
              </div>
              <h3 className="text-xl font-bold">Rachel Benchimol</h3>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-md">
              Acompañamiento post bariátrico profesional para construir hábitos sostenibles y una relación saludable con la comida.
            </p>
          </div>
          <div className="md:text-right">
            <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-6">Redes Sociales</h4>
            <div className="flex gap-4 md:justify-end">
              {['Instagram', 'LinkedIn', 'YouTube'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 hover:bg-olive/10 hover:text-olive hover:border-olive/20 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-stone-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-stone-400">
            © 2026 Nutricionista Rachel Benchimol. Programa de Transformación Bariátrica.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-stone-400">
            <a href="#" className="hover:text-stone-900 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeDetail 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

