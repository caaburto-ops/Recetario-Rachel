import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, Users, ChevronRight, Utensils, Heart, Filter, BookOpen, X, Instagram, Globe } from 'lucide-react';
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
  {
    id: '56',
    title: 'Matcha Latte',
    category: 'Fase 1',
    image: 'https://lh3.googleusercontent.com/d/1yp5Gcd3plgyPnX02oclwuXpBNBBL9VTF',
    description: 'Bebida antioxidante de té matcha con leche proteica.',
    ingredients: [
      '2 g té matcha en polvo (1 cucharadita)',
      '60 ml agua tibia',
      '150 ml leche descremada o leche proteica',
      '1 ml esencia de vainilla (1 gota)',
      '5 gotas de endulzante líquido'
    ],
    instructions: [
      'Disolver el té matcha en el agua tibia con un espumador hasta que no queden grumos.',
      'Calentar la leche sin que llegue a hervir.',
      'Incorporar la leche caliente a la mezcla de matcha batiendo suavemente.',
      'Añadir la vainilla y el endulzante, mezclando para integrar sabores.',
      'Consumir inmediatamente para disfrutar de su aroma y textura.'
    ],
    calories: '52 kcal',
    macros: { p: '5.2 g', c: '7.5 g', g: '0.2 g' }
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
    id: '25',
    title: 'Papilla Dulce Sazón',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1lNbJ0PiYcsRFsjHI_chOWR_7fpXJ5Rt9',
    description: 'Papilla de pollo con papa, zapallo y zanahoria.',
    ingredients: [
      '60 g pechuga de pollo cocida',
      '20 g papa cocida',
      '20 g zapallo cocido',
      '10 g zanahoria cocida',
      '60 ml agua de cocción',
      '20 ml leche proteica descremada',
      '4 g aceite de oliva',
      'Sal a gusto'
    ],
    instructions: [
      'Cocer la pechuga de pollo en agua hasta alcanzar cocción completa, asegurando una textura blanda que facilite su posterior trituración.',
      'Cocer la papa en agua hasta que esté completamente suave.',
      'Paralelamente, hornear el zapallo y la zanahoria hasta que alcancen una consistencia tierna.',
      'Una vez que todos los ingredientes estén cocidos, triturar junto con el agua de cocción y la leche proteica hasta obtener una papilla homogénea y sin grumos.',
      'Añadir el aceite de oliva al final y mezclar suavemente antes de servir.'
    ],
    calories: '205 kcal',
    macros: { p: '20 g', c: '9 g', g: '8 g' }
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
    id: '26',
    title: 'Papilla Reineta al Pesto',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1AdTeL3Xvr6FOvNrn0qHEj-50X0YQnQpx',
    description: 'Papilla de reineta con quínoa y albahaca fresca.',
    ingredients: [
      '60 g reineta cocida',
      '20 g quínoa cocida',
      '5 g albahaca fresca',
      '80 ml agua de cocción',
      '5 g aceite de oliva (1 cdta)',
      'Sal a gusto'
    ],
    instructions: [
      'Cocer la reineta en agua con una pequeña cantidad de sal durante aproximadamente diez minutos hasta alcanzar una cocción completa y una textura blanda.',
      'Transcurrido ese tiempo, añadir la albahaca fresca y continuar la cocción durante cinco minutos adicionales para que libere sus compuestos aromáticos.',
      'Paralelamente, cocinar la quínoa previamente lavada hasta que los granos se abran completamente y logren una textura suave.',
      'Una vez que todos los ingredientes estén cocidos, triturar junto con el agua de cocción y la quínoa hasta obtener una preparación completamente homogénea y sin grumos.',
      'Incorporar finalmente el aceite de oliva y mezclar antes de servir.'
    ],
    calories: '162 kcal',
    macros: { p: '13.9 g', c: '4.8 g', g: '9.8 g' }
  },
  {
    id: '27',
    title: 'Papilla Vegana',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1AdTeL3Xvr6FOvNrn0qHEj-50X0YQnQpx',
    description: 'Papilla de tofu con papa y porotos verdes.',
    ingredients: [
      '60 g tofu firme',
      '20 g papa cocida',
      '15 g porotos verdes cocidos',
      '80 ml agua de cocción',
      '5 g aceite de oliva (1 cdta)',
      'Sal, paprika y eneldo a gusto'
    ],
    instructions: [
      'Cocer la papa y los porotos verdes en agua con una pequeña cantidad de sal hasta que ambos ingredientes alcancen una textura completamente blanda.',
      'Una vez cocidos, añadir paprika y eneldo para aportar sabor y aroma a la preparación.',
      'Incorporar el tofu firme previamente trozado y licuar junto con 80 ml del agua de cocción hasta obtener una papilla homogénea, suave y sin grumos.',
      'Finalmente, añadir el aceite de oliva y mezclar suavemente para aumentar la densidad energética y mejorar la palatabilidad antes de servir.'
    ],
    calories: '123 kcal',
    macros: { p: '8.1 g', c: '4.4 g', g: '8.2 g' }
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
  {
    id: '57',
    title: 'Mousse de Chocolate a Base de Zapallo',
    category: 'Fase 2',
    image: 'https://lh3.googleusercontent.com/d/1Pdqk49hYMsl_LQZaUiqpPLQbDrJDEhv1',
    description: 'Mousse cremoso de chocolate y zapallo, una opción saludable y nutritiva.',
    ingredients: [
      '60 g zapallo cocido',
      '33 g clara de huevo (1 clara)',
      '7 g cacao amargo en polvo (1 cucharada)',
      '15 ml aceite de oliva (1 cucharada)',
      '60 ml agua (1/4 taza)',
      '5 ml esencia de vainilla',
      '5 g polvo de hornear (1 cucharadita)',
      'Endulzante líquido a gusto'
    ],
    instructions: [
      'Cocer el zapallo hasta que esté blando y triturarlo hasta obtener un puré suave.',
      'En un recipiente mezclar el puré con la clara, cacao, vainilla y agua.',
      'Incorporar el aceite de oliva y el endulzante, mezclando bien.',
      'Agregar el polvo de hornear y revolver hasta obtener una mezcla homogénea.',
      'Verter en un molde engrasado y hornear a 180 °C durante aproximadamente 20 minutos.',
      'Dejar enfriar brevemente antes de consumir para mejorar la consistencia.'
    ],
    calories: '176 kcal',
    macros: { p: '6.3 g', c: '7.8 g', g: '14.5 g' }
  },
  // FASE 3
  {
    id: '16',
    title: 'Pollo al Curry con Puré Anaranjado',
    category: 'Fase 3 etapa 1',
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
    category: 'Fase 3 etapa 1',
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
    category: 'Fase 3 etapa 1',
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
    category: 'Fase 3 etapa 1',
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
    category: 'Fase 3 etapa 1',
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
    id: '28',
    title: 'Canoitas de Zapallo Italiano',
    category: 'Fase 3 etapa 1',
    image: 'https://lh3.googleusercontent.com/d/1UoVFzBBukYlujbklTHRlMB5t_XbGrvGL',
    description: 'Zapallito italiano relleno con carne de pavo y vegetales.',
    ingredients: [
      '120 g zapallito italiano cocido',
      '80 g carne molida de pavo cocida',
      '15 g zanahoria',
      '10 g apio',
      '20 g champiñones',
      'Sal y especias a gusto'
    ],
    instructions: [
      'Cocer el zapallito italiano entero en agua hasta que esté blando pero mantenga su estructura.',
      'Cortar longitudinalmente y retirar cuidadosamente parte del centro con una cuchara para formar cavidades.',
      'Saltear el pavo molido junto con zanahoria, apio y champiñones picados finamente hasta lograr cocción completa.',
      'Rellenar las cavidades del zapallo con la mezcla de carne y hornear durante 8 minutos para integrar sabores.'
    ],
    calories: '174 kcal',
    macros: { p: '24.5 g', c: '6.1 g', g: '5.6 g' }
  },
  {
    id: '29',
    title: 'Helado Casero de Frutilla',
    category: 'Fase 3 etapa 1',
    image: 'https://lh3.googleusercontent.com/d/1TWjMHASddb6C9kr1eXsuv-jiSSqtl192',
    description: 'Helado de frutilla con yogurt proteico.',
    ingredients: [
      '150 g frutillas',
      '30 ml agua de cocción',
      '170 g yogurt proteico natural',
      'Endulzante sin calorías'
    ],
    instructions: [
      'Cocer las frutillas hasta que estén completamente blandas y luego procesarlas junto con el agua de cocción hasta obtener un puré fino.',
      'Mezclar el puré con yogurt proteico natural hasta lograr una preparación homogénea.',
      'Verter en moldes para helado y congelar durante al menos ocho horas para lograr una textura firme antes de consumir.'
    ],
    calories: '142 kcal',
    macros: { p: '14.1 g', c: '10.5 g', g: '2.3 g' }
  },
  {
    id: '21',
    title: 'Boloñesa con Pasta',
    category: 'Fase 3 etapa 2',
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
    category: 'Fase 3 etapa 2',
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
    id: '30',
    title: 'Chapsui de Pollo',
    category: 'Fase 3 etapa 2',
    image: 'https://lh3.googleusercontent.com/d/1dJDXPi2WDCShScU7zJ1CXyi70tSVwMhK',
    description: 'Pollo salteado con verduras variadas y salsa de soya.',
    ingredients: [
      '80 g pechuga de pollo',
      '30 g zanahoria',
      '30 g champiñones',
      '30 g porotos verdes',
      '20 g dientes de dragón',
      '15 ml salsa de soya'
    ],
    instructions: [
      'Cortar las verduras en trozos pequeños para facilitar su cocción y posterior masticación.',
      'Cocinar en un sartén junto con el pollo en cubos pequeños agregando pequeñas cantidades de agua para evitar adherencias.',
      'Cuando las verduras estén blandas incorporar los dientes de dragón.',
      'Retirar del fuego y añadir salsa de soya mezclando suavemente antes de servir.'
    ],
    calories: '178 kcal',
    macros: { p: '25.7 g', c: '7.4 g', g: '4.2 g' }
  },
  {
    id: '31',
    title: 'Panqueques Proteicos',
    category: 'Fase 3 etapa 2',
    image: 'https://lh3.googleusercontent.com/d/1GSUUaBy1ZbqZD_hMrVQ-NQ7lafKXLN-R',
    description: 'Panqueques altos en proteína con plátano.',
    ingredients: [
      '15 g whey protein',
      '33 g clara de huevo',
      '30 g plátano',
      'Salsa de fruta cocida'
    ],
    instructions: [
      'Mezclar el whey protein con la clara de huevo y el plátano previamente triturado hasta formar una masa homogénea.',
      'Calentar un sartén antiadherente y cocinar pequeñas porciones de la mezcla por ambos lados hasta que estén firmes.',
      'Servir acompañados de una pequeña cantidad de fruta cocida para aportar sabor y humedad.'
    ],
    calories: '128 kcal',
    macros: { p: '15.4 g', c: '11.2 g', g: '1.6 g' }
  },
  {
    id: '32',
    title: 'Hotcakes de Cacao',
    category: 'Fase 3 etapa 2',
    image: 'https://lh3.googleusercontent.com/d/14bxH0DiZTgIrFJTvH7V_WNcrNJt3RjFi',
    description: 'Hotcakes proteicos con cacao amargo.',
    ingredients: [
      '10 g harina de avena',
      '33 g clara de huevo',
      '15 g whey protein',
      '5 g cacao amargo',
      'Polvo de hornear',
      'Endulzante'
    ],
    instructions: [
      'Mezclar todos los ingredientes hasta obtener una masa suave y homogénea.',
      'Calentar un sartén antiadherente y colocar pequeñas porciones de la mezcla formando discos.',
      'Cocinar a fuego medio por ambos lados hasta que estén firmes.',
      'Servir con una pequeña cantidad de compota de fruta natural.'
    ],
    calories: '134 kcal',
    macros: { p: '16.8 g', c: '8.6 g', g: '2.3 g' }
  },
  {
    id: '33',
    title: 'Mugcake Proteico',
    category: 'Fase 3 etapa 2',
    image: 'https://lh3.googleusercontent.com/d/1b_f4cVdCmZwo7RqFpoupsn0jCtiSUmm7',
    description: 'Bizcocho rápido en taza alto en proteína.',
    ingredients: [
      '1 huevo',
      '45 g yogurt proteico',
      '20 g avena',
      '15 g whey protein',
      '5 g polvo de hornear'
    ],
    instructions: [
      'Colocar todos los ingredientes en una taza apta para microondas y mezclar hasta integrar completamente.',
      'Cocinar en microondas durante dos a tres minutos hasta que el centro esté firme.',
      'Dejar reposar un minuto antes de consumir para estabilizar la textura.'
    ],
    calories: '228 kcal',
    macros: { p: '24.6 g', c: '14.1 g', g: '8.3 g' }
  },
  {
    id: '34',
    title: 'Arepa Reina',
    category: 'Fase 3 etapa 2',
    image: 'https://lh3.googleusercontent.com/d/1oxx6MWJTt8u3b8dd8to2jURKirXfcoEj',
    description: 'Arepa de maíz rellena con pollo y palta.',
    ingredients: [
      '30 g harina de maíz precocida',
      '30 ml agua',
      '60 g pollo cocido',
      '40 g palta'
    ],
    instructions: [
      'Mezclar la harina de maíz con agua y sal hasta formar una masa uniforme.',
      'Dejar reposar cinco minutos para hidratar completamente.',
      'Formar una pequeña arepa y cocinar en sartén antiadherente por ambos lados hasta dorar ligeramente.',
      'Abrir y rellenar con pollo desmenuzado mezclado con palta.'
    ],
    calories: '246 kcal',
    macros: { p: '18.2 g', c: '18.6 g', g: '11.3 g' }
  },
  {
    id: '55',
    title: 'Pescado en Cama de Verduras Cocidas',
    category: 'Fase 3 etapa 2',
    image: 'https://lh3.googleusercontent.com/d/12i9ig-czV6yiXuv3gp32LjhctNBpu3sX',
    description: 'Pescado blanco horneado sobre una base de zanahoria y espinaca cocida.',
    ingredients: [
      '80 g pescado blanco (reineta, merluza o similar)',
      '60 g zanahoria cocida',
      '40 g espinaca cocida',
      '5 g romero fresco (1 ramita)',
      '5 ml aceite de oliva (1 cucharadita)',
      'Sal y aliños a gusto'
    ],
    instructions: [
      'Precalentar el horno a 180 °C.',
      'Cocinar previamente la zanahoria y la espinaca hasta que estén blandas y picarlas finamente.',
      'Colocar las verduras en el fondo de una fuente para horno formando una cama.',
      'Sazonar el pescado y disponerlo sobre las verduras con la ramita de romero.',
      'Hornear durante aproximadamente 20 minutos hasta que el pescado esté cocido.',
      'Al retirar, rociar con aceite de oliva y servir caliente.'
    ],
    calories: '146 kcal',
    macros: { p: '17.3 g', c: '6.8 g', g: '5.6 g' }
  },
  {
    id: '59',
    title: 'Tortillas de Kéfir',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/13uBAjDcTGLcm6mP473f1TQJpzNIN4yHb',
    description: 'Tortillas suaves y proteicas a base de huevo, kéfir y queso.',
    ingredients: [
      '100 g huevo (2 huevos)',
      '30 g yogurt kéfir natural (2 cucharadas)',
      '30 g queso granulado (2 cucharadas)'
    ],
    instructions: [
      'Batir los huevos ligeramente en un recipiente hasta integrar clara y yema.',
      'Añadir el yogurt kéfir y el queso granulado, mezclando hasta obtener una preparación homogénea.',
      'Calentar un sartén antiadherente a fuego medio.',
      'Verter la mezcla formando una tortilla delgada (también se puede usar waflera o tostiarepa).',
      'Cocinar por ambos lados hasta que esté cuajada y ligeramente dorada.',
      'Servir caliente como base para preparaciones saladas.'
    ],
    calories: '215 kcal',
    macros: { p: '18.9 g', c: '1.7 g', g: '14.7 g' }
  },
  {
    id: '23',
    title: 'Tartar de Salmón',
    category: 'Fase 3 etapa 3',
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
    category: 'Fase 3 etapa 3',
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
  },
  {
    id: '35',
    title: 'Pan de Linaza Express',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1500hec-l-uspEh8PGqUY8ng20KVRpBOT',
    description: 'Pan rápido de linaza alto en fibra y grasas saludables.',
    ingredients: [
      '30 g harina de linaza',
      '2 huevos',
      '5 g polvo de hornear',
      'Ajo y orégano'
    ],
    instructions: [
      'Mezclar todos los ingredientes en un recipiente apto para microondas hasta formar una masa uniforme.',
      'Cocinar durante tres minutos hasta que el pan esté completamente firme.',
      'Dejar enfriar, cortar en rebanadas y tostar ligeramente antes de consumir.'
    ],
    calories: '268 kcal',
    macros: { p: '17.6 g', c: '3.4 g', g: '20.4 g' }
  },
  {
    id: '36',
    title: 'Spaghetti de Zapallo',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1wxwtkIiKx6ZKFSE3ha2kPg8O1buL_FUc',
    description: 'Spaghetti vegetal de zapallo butternut.',
    ingredients: [
      '200 g zapallo butternut',
      '5 g aceite de oliva',
      'Sal y especias'
    ],
    instructions: [
      'Cortar el zapallo por la mitad y retirar semillas.',
      'Hornear a 180 °C durante aproximadamente cuarenta minutos hasta que la pulpa esté completamente blanda.',
      'Raspar la pulpa con un tenedor para formar fibras similares a pasta.',
      'Añadir aceite de oliva y especias antes de servir.'
    ],
    calories: '114 kcal',
    macros: { p: '2.0 g', c: '21.0 g', g: '5.2 g' }
  },
  {
    id: '37',
    title: 'Ceviche de Champiñones',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1UeSbjSqrAhRLiuMAdktl7l8DyP3hXAB4',
    description: 'Ceviche vegetal fresco a base de champiñones y palta.',
    ingredients: [
      '200 g champiñones',
      '50 g cebolla morada',
      '50 g pimentón rojo',
      '50 g pimentón verde',
      '70 g palta',
      '20 ml jugo de limón',
      '10 g aceite de oliva'
    ],
    instructions: [
      'Cortar todos los vegetales en cubos pequeños y colocarlos en un recipiente amplio.',
      'Añadir jugo de limón, aceite de oliva, sal y especias.',
      'Mezclar suavemente para integrar sabores.',
      'Refrigerar durante al menos treinta minutos antes de consumir para permitir la maceración.'
    ],
    calories: '238 kcal',
    macros: { p: '5.6 g', c: '13.8 g', g: '18.2 g' }
  },
  {
    id: '52',
    title: 'Carpaccio de Zapallo Italiano',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1lroQwjO9SCxrVL-0u-zH-p1L6faBIZ66',
    description: 'Carpaccio fresco de zapallo italiano con limón, queso de cabra y frutos secos.',
    ingredients: [
      '400 g zapallo italiano (2 unidades medianas)',
      '60 ml jugo de limón (2 limones)',
      '9 g aceite de oliva (2 cucharaditas)',
      '15 g queso de cabra desmenuzado',
      '10 g frutos secos molidos (nueces o almendras)',
      '5 g hojas de albahaca fresca',
      'Sal y aliños a gusto'
    ],
    instructions: [
      'Lavar los zapallos italianos y cortarlos en rodajas muy finas.',
      'Disponer las láminas ordenadamente sobre un plato amplio.',
      'Rociar con el jugo de limón para aportar acidez y frescura.',
      'Añadir el aceite de oliva distribuyéndolo de manera homogénea.',
      'Incorporar sal y aliños a gusto.',
      'Decorar con hojas de albahaca fresca, frutos secos molidos y queso de cabra desmenuzado.',
      'Refrigerar brevemente antes de servir para potenciar los sabores.'
    ],
    calories: '227 kcal',
    macros: { p: '8.4 g', c: '15.2 g', g: '16.2 g' }
  },
  {
    id: '53',
    title: 'Garbanzos Crocantes',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1cLOS2pJ1-OmbR6vHbSyDOp0UHQjLATqp',
    description: 'Garbanzos tostados y crujientes con paprika y ajo, ideales como snack.',
    ingredients: [
      '165 g garbanzos cocidos (1 taza)',
      '5 g paprika (1 cucharadita)',
      '2 g ajo en polvo (1/2 cucharadita)',
      '14 g aceite de oliva (1 cucharada)',
      'Sal a gusto'
    ],
    instructions: [
      'Escurrir completamente los garbanzos cocidos y secarlos con papel absorbente.',
      'Mezclarlos con la paprika, el ajo en polvo, el aceite de oliva y sal a gusto.',
      'Distribuirlos en una sola capa sobre una bandeja de horno o en la cesta de una freidora de aire.',
      'Cocinar a 180 °C durante aproximadamente 30 minutos, removiendo ocasionalmente.',
      'Dejar enfriar unos minutos antes de consumir para que adquieran una textura más crujiente.'
    ],
    calories: '409 kcal',
    macros: { p: '14.8 g', c: '44.9 g', g: '17.4 g' }
  },
  {
    id: '38',
    title: 'Pan de Palta',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1s_EIfezrKRIFArIYvl0OVrPGe2ed_4C_',
    description: 'Pan nutritivo a base de palta y huevo, alto en proteínas y grasas saludables.',
    ingredients: [
      '200 g palta',
      '150 g huevo (3 huevos)',
      '56 g queso mozzarella rallado',
      '5 g polvo de hornear',
      'Sal y aliños a gusto'
    ],
    instructions: [
      'Triturar la palta hasta obtener una pasta suave.',
      'Batir los huevos hasta lograr una mezcla ligeramente espumosa.',
      'Incorporar la palta molida junto con el queso mozzarella rallado, el polvo de hornear y los aliños. Mezclar hasta integrar completamente.',
      'Distribuir la preparación en moldes pequeños y hornear a 180 °C durante aproximadamente veinte minutos.'
    ],
    calories: '615 kcal',
    macros: { p: '31.4 g', c: '13.8 g', g: '48.7 g' }
  },
  {
    id: '47',
    title: 'Pasta de Huevo con Ciboulette',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1LM9JRxodmV54cn9QfajRlIERHcBmjllo',
    description: 'Pasta cremosa de huevo y yogurt con un toque de ciboulette fresco.',
    ingredients: [
      '150 g huevo cocido (3 huevos)',
      '30 g yogurt natural sin endulzar (2 cucharadas)',
      '5 g ciboulette fresco picado (1 cucharada)',
      'Sal y aliños a gusto'
    ],
    instructions: [
      'Cocer los huevos en agua hirviendo durante aproximadamente diez minutos hasta que estén completamente duros.',
      'Enfriarlos bajo agua fría, retirar la cáscara y triturarlos hasta obtener una textura desmenuzada fina.',
      'Añadir el yogurt natural sin endulzar para aportar cremosidad y facilitar la mezcla.',
      'Incorporar el ciboulette picado finamente junto con sal y aliños a gusto.',
      'Mezclar suavemente hasta lograr una pasta homogénea.',
      'Refrigerar durante algunos minutos antes de servir para mejorar la textura.'
    ],
    calories: '247 kcal',
    macros: { p: '19.6 g', c: '2.0 g', g: '16.8 g' }
  },
  {
    id: '39',
    title: 'Queque de Limón',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1GGKqvrx_ttA5Nc1K45MyRJ7JnSMO_Tvs',
    description: 'Queque esponjoso de limón con harina de avena y yogurt.',
    ingredients: [
      '100 g huevo (2 huevos)',
      '120 g endulzante en polvo',
      '60 ml aceite vegetal',
      '240 g yogurt natural',
      '300 g harina de avena',
      '5 g polvo de hornear',
      'Ralladura y jugo de limón'
    ],
    instructions: [
      'Batir los huevos junto con el endulzante hasta lograr una mezcla espumosa.',
      'Añadir el aceite vegetal y la ralladura de limón.',
      'Incorporar el jugo de limón y el yogurt natural.',
      'Agregar la harina de avena y mezclar suavemente con movimientos envolventes.',
      'Añadir el polvo de hornear y hornear a 180 °C durante aproximadamente treinta minutos.'
    ],
    calories: '1185 kcal (receta completa)',
    macros: { p: '47.2 g', c: '158.3 g', g: '39.6 g' }
  },
  {
    id: '54',
    title: 'Queque de Coco y Arándanos',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/14WqDu2r9Jd5TR6LEHF9WS8BsLNSPAiPG',
    description: 'Queque esponjoso de coco con arándanos frescos, sin gluten y sin azúcar refinada.',
    ingredients: [
      '112 g harina de coco (1 taza)',
      '100 g huevo (2 huevos)',
      '60 ml aceite vegetal (coco, oliva suave o canola)',
      '200 g arándanos frescos',
      '96 g alulosa en polvo o endulzante equivalente',
      '5 ml esencia de vainilla (1 cucharadita)',
      '5 g polvo de hornear (1 cucharadita)',
      '100 ml leche de almendras sin azúcar'
    ],
    instructions: [
      'Precalentar el horno a 180 °C y engrasar un molde.',
      'En un recipiente mezclar los huevos, aceite, esencia de vainilla y leche de almendras.',
      'En otro recipiente combinar la harina de coco, alulosa y polvo de hornear.',
      'Incorporar gradualmente los ingredientes secos sobre la mezcla líquida hasta formar una masa homogénea.',
      'Añadir los arándanos frescos y mezclar suavemente.',
      'Verter la preparación en el molde y hornear durante aproximadamente 30 minutos hasta que esté firme y dorada.',
      'Dejar enfriar antes de cortar para mejorar la textura.'
    ],
    calories: '1037 kcal (receta completa)',
    macros: { p: '36.9 g', c: '69.4 g', g: '70.6 g' }
  },
  {
    id: '40',
    title: 'Banana Bread',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1TUqQ_xI3yIiw4eMFlFpwOdPTUDVwcsTY',
    description: 'Pan de plátano esponjoso y nutritivo con harina de avena.',
    ingredients: [
      '240 g plátano maduro (2 unidades)',
      '100 g huevo (2 huevos)',
      '60 ml aceite vegetal',
      '240 g harina de avena',
      '60 ml leche descremada',
      '5 g polvo de hornear',
      '20 g endulzante'
    ],
    instructions: [
      'Triturar los plátanos hasta formar un puré uniforme.',
      'Batir los huevos junto con el aceite hasta integrar completamente.',
      'Incorporar el puré de plátano y el endulzante.',
      'Añadir la harina de avena, la leche descremada y el polvo de hornear.',
      'Mezclar hasta obtener una masa homogénea y hornear a 180 °C durante aproximadamente treinta y cinco minutos.'
    ],
    calories: '1260 kcal (receta completa)',
    macros: { p: '46.8 g', c: '176.4 g', g: '47.1 g' }
  },
  {
    id: '41',
    title: 'Brownie sin Azúcar',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1i6b1rgj3zJDeh07n700PafSxVYnF_adc',
    description: 'Brownie intenso y húmedo sin azúcar añadida.',
    ingredients: [
      '150 g huevo (3 huevos)',
      '45 g yogurt natural',
      '120 ml aceite vegetal',
      '60 g harina de avena',
      '50 g cacao amargo',
      '120 g alulosa',
      '5 g polvo de hornear',
      '1 g café en polvo'
    ],
    instructions: [
      'Batir los huevos con el yogurt hasta integrar completamente.',
      'Añadir el aceite y continuar mezclando.',
      'Incorporar la harina de avena, el cacao, la alulosa, el café y el polvo de hornear.',
      'Mezclar con movimientos envolventes hasta obtener una masa homogénea.',
      'Verter en un molde y hornear a 180 °C durante aproximadamente veinticinco minutos.'
    ],
    calories: '1472 kcal (receta completa)',
    macros: { p: '38.2 g', c: '62.5 g', g: '123.8 g' }
  },
  {
    id: '42',
    title: 'Bolitas Cacao Maní',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1fBFz8_LeO5MfLpcGsYfUjW099lgsIJ2j',
    description: 'Snack energético de mantequilla de maní y cacao.',
    ingredients: [
      '12 g alulosa en polvo (3 cucharadas)',
      '64 g mantequilla de maní natural (4 cucharadas)',
      '20 g cacao amargo en polvo (4 cucharadas)',
      '96 g alulosa adicional o endulzante equivalente',
      '1 g sal'
    ],
    instructions: [
      'Colocar en un recipiente la mantequilla de maní natural junto con el cacao amargo en polvo.',
      'Añadir la alulosa y una pizca de sal para equilibrar el sabor.',
      'Mezclar de manera constante hasta obtener una pasta homogénea y firme.',
      'Con las manos limpias formar pequeñas bolitas de tamaño uniforme.',
      'Refrigerar durante al menos treinta minutos para que la mezcla tome consistencia.'
    ],
    calories: '423 kcal (receta completa)',
    macros: { p: '16.7 g', c: '18.6 g', g: '34.9 g' }
  },
  {
    id: '43',
    title: 'Mousse de Huevo y Cacao',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1XOxNTAqnhfSoVR9i7-ahXG4hSq0hbI9W',
    description: 'Mousse aireado y proteico de cacao.',
    ingredients: [
      '100 g huevo (2 huevos)',
      '15 g cacao amargo en polvo (3 cucharadas)',
      '8 g alulosa (2 cucharadas)',
      '16 g mantequilla de maní (1 cucharada)',
      '60 ml leche descremada'
    ],
    instructions: [
      'Colocar los huevos en una procesadora o licuadora junto con el cacao amargo, la alulosa y la mantequilla de maní.',
      'Añadir la leche descremada para facilitar la emulsión.',
      'Procesar durante varios segundos hasta obtener una mezcla completamente homogénea y aireada.',
      'Refrigerar la preparación durante al menos treinta minutos antes de consumir para mejorar la textura.'
    ],
    calories: '274 kcal',
    macros: { p: '17.8 g', c: '8.9 g', g: '18.4 g' }
  },
  {
    id: '44',
    title: 'Brownie de Calabaza',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1TBBSjXg16jrF_BbsGrCthTbj_8f4Redt',
    description: 'Brownie tipo fudge a base de puré de calabaza y cacao.',
    ingredients: [
      '245 g puré de calabaza cocida',
      '100 g huevo (2 huevos)',
      '120 ml aceite vegetal (coco, oliva suave o canola)',
      '50 g cacao amargo en polvo sin azúcar',
      '96 g alulosa en polvo',
      '5 ml esencia de vainilla',
      '2 g polvo de hornear',
      '1 g sal',
      'Opcional: 30 g chips de chocolate ≥60 % cacao'
    ],
    instructions: [
      'Precalentar el horno a 180 °C y engrasar un molde pequeño.',
      'En un recipiente amplio colocar el puré de calabaza cocida junto con los huevos, el aceite vegetal, la esencia de vainilla y el endulzante. Mezclar hasta obtener una preparación homogénea.',
      'Añadir el cacao en polvo, el polvo de hornear y la sal, integrando con movimientos constantes hasta formar una masa uniforme.',
      'Verter la mezcla en el molde y, si se desea, agregar chips de chocolate o nueces sobre la superficie.',
      'Hornear durante aproximadamente 30 minutos hasta que al insertar un palillo este salga con migas húmedas.',
      'Dejar enfriar completamente antes de cortar para mejorar la textura tipo fudge.'
    ],
    calories: '1289 kcal (receta completa)',
    macros: { p: '27.9 g', c: '51.6 g', g: '109.8 g' }
  },
  {
    id: '45',
    title: 'Cocadas',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1OzO6ANRiyaOsB4mrjIHaue6pffvqox6O',
    description: 'Bolitas de coco horneadas, suaves por dentro y doradas por fuera.',
    ingredients: [
      '66 g clara de huevo (2 claras)',
      '120 g coco rallado sin azúcar (1 1/2 taza)',
      '24 g endulzante en polvo (2 cucharadas)'
    ],
    instructions: [
      'Colocar las claras de huevo en un recipiente limpio y batirlas hasta alcanzar punto nieve.',
      'Incorporar gradualmente el coco rallado junto con el endulzante en polvo, mezclando con movimientos envolventes.',
      'Formar pequeñas bolitas de tamaño uniforme y colocarlas sobre una bandeja con papel de hornear.',
      'Cocinar en horno previamente precalentado a 180 °C durante 20 a 25 minutos, hasta que estén ligeramente doradas.',
      'Dejar enfriar antes de consumir para que mantengan su forma.'
    ],
    calories: '794 kcal (receta completa)',
    macros: { p: '11.4 g', c: '29.8 g', g: '76.8 g' }
  },
  {
    id: '46',
    title: 'Alfajores de Frutilla / Plátano',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1PQubhpGhuJlUs04uR6x2bbfINJeDVsGU',
    description: 'Alfajores de fruta fresca rellenos y bañados en chocolate amargo.',
    ingredients: [
      '150 g frutilla fresca o plátano',
      '40 g mantequilla de maní natural o manjar sin azúcar',
      '40 g chocolate ≥75 % cacao'
    ],
    instructions: [
      'Lavar y secar las frutas seleccionadas.',
      'Cortar el plátano o las frutillas en rodajas de aproximadamente un centímetro de grosor para obtener piezas uniformes.',
      'Colocar una pequeña cantidad de mantequilla de maní o manjar sin azúcar sobre una rodaja y cubrir con otra formando un pequeño “alfajor”.',
      'Derretir el chocolate a baño maría o en microondas en intervalos cortos, removiendo para evitar que se queme.',
      'Bañar cada alfajor en el chocolate fundido hasta cubrirlo completamente.',
      'Colocar las unidades sobre papel de hornear y llevar al refrigerador durante al menos veinte minutos hasta que el chocolate se solidifique.'
    ],
    calories: '356 kcal',
    macros: { p: '9.1 g', c: '28.4 g', g: '23.5 g' }
  },
  {
    id: '48',
    title: 'Hummus de Zanahoria',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1-EfyaVZFvwRjVR88P5xEhbQdmPhddZPS',
    description: 'Hummus cremoso con zanahoria asada para un toque dulce y nutritivo.',
    ingredients: [
      '165 g garbanzos cocidos (1 taza)',
      '60 g zanahoria asada',
      '3 g ajo fresco (1 diente)',
      '28 g aceite de oliva (2 cucharadas)',
      'Sal y aliños a gusto'
    ],
    instructions: [
      'Asar previamente la zanahoria en horno hasta que esté completamente blanda.',
      'Colocar los garbanzos cocidos en una procesadora o licuadora junto con la zanahoria asada y el diente de ajo.',
      'Procesar mientras se añade gradualmente el aceite de oliva para facilitar la emulsión.',
      'Incorporar sal y aliños a gusto y continuar procesando hasta obtener una pasta homogénea y cremosa.',
      'Si se requiere ajustar la textura, puede añadirse una pequeña cantidad de agua o del líquido de cocción de los garbanzos.',
      'Refrigerar brevemente antes de servir para mejorar la consistencia.'
    ],
    calories: '451 kcal',
    macros: { p: '14.1 g', c: '47.3 g', g: '23.2 g' }
  },
  {
    id: '49',
    title: 'Bocaditos de Yogurt y Frutilla',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1y48frDMV8u8lp0kfRxZZhe6AeNVSzT81',
    description: 'Bocaditos congelados de yogurt con frutilla bañados en chocolate amargo.',
    ingredients: [
      '125 g yogurt natural endulzado (1 unidad)',
      '150 g frutillas frescas (1 taza)',
      '40 g chocolate ≥75 % cacao'
    ],
    instructions: [
      'Lavar cuidadosamente las frutillas y cortarlas en cubos pequeños.',
      'Colocar el yogurt natural en un recipiente y añadir las frutillas picadas, mezclando suavemente.',
      'Sobre una bandeja cubierta con papel film o papel de hornear formar pequeños montículos con la mezcla utilizando una cuchara.',
      'Llevar la bandeja al congelador durante aproximadamente una hora hasta que estén firmes.',
      'Derretir el chocolate a baño maría o en microondas en intervalos cortos.',
      'Bañar cada bocadito congelado en el chocolate fundido y volver a refrigerar hasta que el chocolate se solidifique.'
    ],
    calories: '301 kcal',
    macros: { p: '8.7 g', c: '36.4 g', g: '14.9 g' }
  },
  {
    id: '50',
    title: 'Bastones de Plátano con Chocolate',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1eFH_Spu7KJoqngRX7Ln82yrXF0OoxBzL',
    description: 'Bastones de plátano bañados en chocolate amargo con un toque de sal de mar.',
    ingredients: [
      '120 g plátano (1 unidad mediana)',
      '40 g chocolate ≥75 % cacao sin azúcar añadida',
      '1 g sal de mar (pizca)'
    ],
    instructions: [
      'Pelar el plátano y cortarlo longitudinalmente formando bastones de tamaño uniforme.',
      'Colocar los bastones sobre una bandeja cubierta con papel de hornear.',
      'Derretir el chocolate a baño maría o en microondas en intervalos cortos.',
      'Bañar cada bastón en el chocolate fundido hasta cubrirlo completamente.',
      'Espolvorear una pequeña pizca de sal de mar sobre la superficie para potenciar los sabores.',
      'Llevar al refrigerador durante al menos veinte minutos hasta que el chocolate se endurezca.'
    ],
    calories: '274 kcal',
    macros: { p: '4.1 g', c: '33.6 g', g: '15.2 g' }
  },
  {
    id: '51',
    title: 'Galletas de Avena',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1nag8W1qe3KHJ2WDCNe9aH97_RCuEJxYD',
    description: 'Galletas caseras de avena, nutritivas y perfectas para un snack saludable.',
    ingredients: [
      '360 g harina de avena (3 tazas)',
      '80 g avena en hojuelas (1 taza)',
      '96 g endulzante en polvo (1/2 taza)',
      '150 g huevo (3 huevos)',
      '60 ml aceite vegetal',
      '5 ml esencia de vainilla'
    ],
    instructions: [
      'En un recipiente amplio mezclar la harina de avena, la avena en hojuelas y el endulzante en polvo.',
      'En otro recipiente batir los huevos junto con el aceite vegetal y la esencia de vainilla.',
      'Incorporar gradualmente la mezcla líquida sobre los ingredientes secos y revolver hasta formar una masa consistente.',
      'Formar pequeñas bolitas del mismo tamaño y colocarlas sobre una bandeja con papel de hornear.',
      'Hornear en horno precalentado a 180 °C durante 10 a 15 minutos hasta que estén firmes y doradas.',
      'Dejar enfriar antes de retirar de la bandeja para que mantengan su forma.'
    ],
    calories: '2093 kcal (receta completa)',
    macros: { p: '82.7 g', c: '260.8 g', g: '85.9 g' }
  },
  {
    id: '58',
    title: 'Granola Casera',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/1XlCxuyqgiK3CZM7P9Nqdb-SahQReLhxF',
    description: 'Granola casera crocante y nutritiva con almendras, chía y avena, sin azúcar añadida.',
    ingredients: [
      '160 g avena en hojuelas (2 tazas)',
      '140 g almendras picadas (1 taza)',
      '24 g semillas de chía (2 cucharadas)',
      '14 g harina de coco (2 cucharadas)',
      '28 g aceite de oliva (2 cucharadas)',
      '3 g canela en polvo (1 cucharadita)',
      '5 ml esencia de vainilla natural (1 cucharadita)',
      '1 g sal (pizca)',
      'Alulosa líquida o en gotas (20–30 gotas)'
    ],
    instructions: [
      'Precalentar el horno o freidora de aire a 170 °C.',
      'En un recipiente amplio mezclar todos los ingredientes secos: avena, almendras, chía, harina de coco, canela y sal.',
      'Añadir el aceite de oliva, la esencia de vainilla y el endulzante, mezclando hasta cubrir ligeramente los ingredientes.',
      'Distribuir la mezcla de manera uniforme sobre una bandeja con papel de horno o aluminio.',
      'Hornear durante 20 a 25 minutos, removiendo ocasionalmente para un tostado homogéneo.',
      'Retirar y dejar enfriar completamente para que adquiera su textura crocante.'
    ],
    calories: '1336 kcal (receta completa)',
    macros: { p: '37.9 g', c: '103.6 g', g: '91.4 g' }
  },
  {
    id: '60',
    title: 'Pasta de Berenjena',
    category: 'Fase 3 etapa 3',
    image: 'https://lh3.googleusercontent.com/d/15-eUJgNJbkrSaqeULV_6NC1At-3LipKL',
    description: 'Pasta cremosa de berenjena (Baba Ganoush) con yogurt griego y cilantro.',
    ingredients: [
      '150 g berenjena cocida y pelada (1/2 unidad grande)',
      '3 g ajo fresco (1 diente)',
      '10 g jugo de limón (1/2 limón)',
      '14 g aceite de oliva (1 cucharada)',
      '15 g yogurt griego natural (1 cucharada)',
      '5 g cilantro fresco (hojitas)',
      '15 g tahini (1 cucharada, opcional)',
      'Sal a gusto'
    ],
    instructions: [
      'Cocer la berenjena hasta que esté blanda, retirar la piel y cortarla en tiras.',
      'Colocar en una procesadora con el ajo, jugo de limón y aceite de oliva.',
      'Añadir el yogurt griego para aportar cremosidad.',
      'Incorporar el cilantro fresco y sal a gusto.',
      'Opcional: agregar tahini para un sabor más intenso.',
      'Procesar hasta obtener una pasta homogénea y suave.',
      'Refrigerar brevemente antes de servir como dip o untable.'
    ],
    calories: '190 kcal (237 kcal con tahini)',
    macros: { p: '3.1 g (5.6 g con tahini)', c: '9.2 g (10.6 g con tahini)', g: '15.4 g (19.7 g con tahini)' }
  }
];

const CATEGORIES = ['Todas', 'Fase 1', 'Fase 2', 'Fase 3 etapa 1', 'Fase 3 etapa 2', 'Fase 3 etapa 3'];

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
              Tu Recetario <br /> 
              <span className="text-olive italic font-serif font-normal">Bariátrico.</span>
            </h2>
            
            <p className="text-xl text-stone-600 mb-10 max-w-xl leading-relaxed">
              60 recetas detalladas con aporte nutricional exacto, diseñadas para acompañarte en cada fase de tu recuperación: desde la dieta líquida hasta la alimentación sólida.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto px-10 py-5 bg-olive text-white rounded-xl font-bold text-xl hover:bg-olive/90 transition-all shadow-xl shadow-olive/20 flex items-center justify-center gap-3 group whitespace-nowrap">
                Explorar Recetas por Fase
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
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
                  Destacado Fase 3 etapa 1
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
            <p className="text-stone-500 text-sm leading-relaxed max-w-md mb-6">
              Acompañamiento post bariátrico profesional para construir hábitos sostenibles y una relación saludable con la comida.
            </p>
            <a 
              href="https://rachelbenchimol.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-olive font-bold hover:underline group"
            >
              <Globe size={18} />
              rachelbenchimol.com
            </a>
          </div>
          <div className="md:text-right">
            <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-6">Redes Sociales</h4>
            <div className="flex gap-4 md:justify-end">
              <a 
                href="https://www.instagram.com/rachelb_nutricion/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 hover:bg-olive/10 hover:text-olive hover:border-olive/20 transition-all"
              >
                <Instagram size={24} />
              </a>
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

