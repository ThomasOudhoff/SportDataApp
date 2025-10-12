import React, { useMemo } from "react";
import './SeasonSelect.component.css';


export default function SeasonSelector({
                                           value,
                                           onChange,
                                           yearsBack = 10,
                                           baseYear,
                                           startAtCurrent = true,
                                           id = "season",
                                           label = "",
                                           className = "",
                                           disabled = false,
                                           required = false,
                                       }) {
    const currentYear = baseYear ?? new Date().getFullYear();

    const options = useMemo(() => {
        const first = startAtCurrent ? currentYear : currentYear - 1;
        const total = yearsBack + 1; // bv. 11 opties
        return Array.from({ length: total }, (_, i) => {
            const start = first - i;
            const end = start + 1;
            return `${start}-${end}`;
        });
    }, [currentYear, yearsBack, startAtCurrent]);

    return (
        <div className={`season-selector ${className || ""}`}>
            <label htmlFor={id} className="season-selector__label">{label}</label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                required={required}
                className="season-selector__select"
            >
                {options.map((season) => (
                    <option key={season} value={season}>
                        {season}
                    </option>
                ))}
            </select>
        </div>
    );
}
