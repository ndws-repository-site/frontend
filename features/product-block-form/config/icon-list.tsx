import type { ComponentType } from "react";
import { AdminSelectOption } from "@/shared/admin";
import * as Icons from "lucide-react";

const createOption = (name: string, ruKeywords: string): AdminSelectOption => {
    const Icon =
        (Icons as unknown as Record<string, ComponentType<{ size?: number }>>)[
            name
        ] ?? Icons.HelpCircle;

    return {
        value: name,
        keywords: `${name} ${ruKeywords}`.toLowerCase(),
        label: (
            <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{name}</span>
            </div>
        ),
    };
};

/**
 * Список нейтральных иконок для блока продуктов.
 * Только геометрия, стрелки, базовые UI-элементы — без тематических (игры, еда, бренды и т.д.)
 */
export const getNeutralIconList = (): AdminSelectOption[] => [
    // --- ГЕОМЕТРИЯ ---
    createOption("Circle", "круг точка"),
    createOption("CircleDot", "круг точка центр"),
    createOption("Square", "квадрат"),
    createOption("Hexagon", "шестиугольник"),
    createOption("Octagon", "восьмиугольник"),
    createOption("Box", "коробка куб"),
    createOption("RectangleHorizontal", "прямоугольник горизонтальный"),
    createOption("RectangleVertical", "прямоугольник вертикальный"),
    createOption("Diamond", "ромб"),
    createOption("Triangle", "треугольник"),

    // --- LAYOUT И СТРУКТУРА ---
    createOption("LayoutGrid", "сетка блоки"),
    createOption("Layout", "макет"),
    createOption("Grid3X3", "сетка 3x3"),
    createOption("Rows", "ряды строки"),
    createOption("Columns", "колонки столбцы"),
    createOption("Blocks", "блоки"),
    createOption("SquareStack", "стопка квадратов"),
    createOption("Layers", "слои"),
    createOption("PanelLeft", "панель"),

    // --- СТРЕЛКИ И НАВИГАЦИЯ ---
    createOption("ArrowRight", "стрелка вправо"),
    createOption("ArrowLeft", "стрелка влево"),
    createOption("ArrowUp", "стрелка вверх"),
    createOption("ArrowDown", "стрелка вниз"),
    createOption("ChevronRight", "шеврон вправо"),
    createOption("ChevronLeft", "шеврон влево"),
    createOption("ChevronDown", "шеврон вниз"),
    createOption("ChevronUp", "шеврон вверх"),
    createOption("ChevronsRight", "двойной шеврон вправо"),
    createOption("ChevronsLeft", "двойной шеврон влево"),

    // --- БАЗОВЫЕ СИМВОЛЫ ---
    createOption("Plus", "плюс добавить"),
    createOption("Minus", "минус убрать"),
    createOption("Check", "галочка"),
    createOption("X", "крестик закрыть"),
    createOption("Dot", "точка"),
    createOption("MinusCircle", "минус круг"),
    createOption("PlusCircle", "плюс круг"),
    createOption("CircleCheck", "круг галочка"),

    // --- ЛИНИИ И РАЗДЕЛИТЕЛИ ---
    createOption("GripVertical", "ручка вертикальная"),
    createOption("GripHorizontal", "ручка горизонтальная"),
    createOption("SeparatorHorizontal", "разделитель"),
    createOption("SeparatorVertical", "разделитель вертикальный"),

    // --- ТЕКСТ И ТИПОГРАФИКА ---
    createOption("Type", "текст буквы"),
    createOption("Hash", "хеш решетка"),
    createOption("AtSign", "собака"),
    createOption("Percent", "процент"),
    createOption("Asterisk", "звездочка"),
    createOption("Slash", "слэш"),
    createOption("Braces", "скобки фигурные"),
    createOption("Brackets", "скобки квадратные"),

    // --- ИНФОРМАЦИЯ (нейтральные) ---
    createOption("Info", "информация"),
    createOption("HelpCircle", "помощь вопрос"),
    createOption("CircleHelp", "круг помощь"),
];
