import { List, ListRowRenderer } from 'react-virtualized'
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
    totalPrice: number;
    results: Array<{
        id: number;
        price: number;
        priceFormatted: string;
        title: string;
    }>
    onAddToWishlist: (id: number) => void;
}

export function SearchResults({ results, totalPrice, onAddToWishlist }: SearchResultsProps) {
    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key} style={style}>
                <ProductItem
                    product={results[index]}
                    onAddToWishlist={onAddToWishlist}
                />
            </div>
        );
    }

    return (
        <div>
            <h2>{totalPrice}</h2>

            <List
                height={300}
                rowHeight={25}
                width={900}
                overscanRowCount={5}
                rowCount={results.length}
                rowRenderer={rowRenderer}
            />
        </div>
    );
}

/** useMemo
 * 1. Usar em cálculos pesados
 * 2. Usar em igualdade referencial (quando repassa a informação ao componente filho)
 */