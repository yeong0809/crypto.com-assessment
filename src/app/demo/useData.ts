import { useEffect, useRef, useState } from 'react';
import { storage } from '@/lib/index';

type Crypto = {
  id: string;
  name: string;
  symbol: string;
};

type Fiat = {
  id: string;
  name: string;
  symbol: string;
  code: string;
};

type UseDataResult = {
  list: (Crypto | Fiat)[];
  clearDatabase: () => void;
  insertToDatabase: () => void;
  populateCurrencyListA: () => void;
  populateCurrencyListB: () => void;
  populateCurrencyListAB: () => void;
  onSearch: (query: string) => void;
};

const CRYPTOS: Crypto[] = [
  {
    id: `BTC`,
    name: `Bitcoin`,
    symbol: `BTC`,
  },
  {
    id: `ETH`,
    name: `Ethereum`,
    symbol: `ETH`,
  },
  {
    id: `XRP`,
    name: `XRP`,
    symbol: `XRP`,
  },
  {
    id: `BCH`,
    name: `Bitcoin Cash`,
    symbol: `BCH`,
  },
  {
    id: `LTC`,
    name: `Litecoin`,
    symbol: `LTC`,
  },
  {
    id: `EOS`,
    name: `EOS`,
    symbol: `EOS`,
  },
  {
    id: `BNB`,
    name: `Binance Coin`,
    symbol: `BNB`,
  },
  {
    id: `LINK`,
    name: `Chainlink`,
    symbol: `LINK`,
  },
  {
    id: `NEO`,
    name: `NEO`,
    symbol: `NEO`,
  },
  {
    id: `ETC`,
    name: `Ethereum Classic`,
    symbol: `ETC`,
  },
  {
    id: `ONT`,
    name: `Ontology`,
    symbol: `ONT`,
  },
  {
    id: `CRO`,
    name: `Crypto.com Chain`,
    symbol: `CRO`,
  },
  {
    id: `CUC`,
    name: `Cucumber`,
    symbol: `CUC`,
  },
  {
    id: `USDC`,
    name: `USD Coin`,
    symbol: `USDC`,
  },
];

const FIATS: Fiat[] = [
  {
    id: `SGD`,
    name: `Singapore Dollar`,
    symbol: `$`,
    code: `SGD`,
  },
  {
    id: `EUR`,
    name: `Euro`,
    symbol: `€`,
    code: `EUR`,
  },
  {
    id: `GBP`,
    name: `British Pound`,
    symbol: `£`,
    code: `GBP`,
  },
  {
    id: `HKD`,
    name: `Hong Kong Dollar`,
    symbol: `$`,
    code: `HKD`,
  },
  {
    id: `JPY`,
    name: `Japanese Yen`,
    symbol: `¥`,
    code: `JPY`,
  },
  {
    id: `AUD`,
    name: `Australian Dollar`,
    symbol: `$`,
    code: `AUD`,
  },
  {
    id: `USD`,
    name: `United States Dollar`,
    symbol: `$`,
    code: `USD`,
  },
];

const useData = (): UseDataResult => {
  const showing = useRef<string[]>([]);
  const [list, setList] = useState<(Crypto | Fiat)[]>([]);

  useEffect(() => {
    const init = async () => {
      const db = await storage.getDBConnection();

      await storage.createTable(
        db,
        storage.TABLES.CRYPTOS,
        `
        id TEXT NOT NULL,
        name TEXT NOT NULL,
        symbol TEXT
        `
      );

      await storage.createTable(
        db,
        storage.TABLES.FIATS,
        `
        id TEXT NOT NULL,
        name TEXT NOT NULL,
        symbol TEXT,
        code TEXT
        `
      );
    };

    init();
  }, []);

  const clearDatabase = async () => {
    const db = await storage.getDBConnection();

    await storage.truncateTable(db, storage.TABLES.CRYPTOS);
    await storage.truncateTable(db, storage.TABLES.FIATS);
  };

  const insertToDatabase = async () => {
    const db = await storage.getDBConnection();

    await storage.truncateTable(db, storage.TABLES.CRYPTOS);
    await storage.truncateTable(db, storage.TABLES.FIATS);

    await storage.insertItems(
      db,
      storage.TABLES.CRYPTOS,
      [`id`, `name`, `symbol`],
      CRYPTOS.map((crypto) => {
        return [crypto.id, crypto.name, crypto.symbol];
      })
    );

    await storage.insertItems(
      db,
      storage.TABLES.FIATS,
      [`id`, `name`, `symbol`, `code`],
      FIATS.map((fiat) => {
        return [fiat.id, fiat.name, fiat.symbol, fiat.code];
      })
    );
  };

  const populateCurrencyListA = async () => {
    const db = await storage.getDBConnection();

    const cryptos = await storage.getItems<Crypto>(db, storage.TABLES.CRYPTOS);

    showing.current = [storage.TABLES.CRYPTOS];
    setList(cryptos);
  };

  const populateCurrencyListB = async () => {
    const db = await storage.getDBConnection();

    const fiats = await storage.getItems<Fiat>(db, storage.TABLES.FIATS);

    showing.current = [storage.TABLES.FIATS];
    setList(fiats);
  };

  const populateCurrencyListAB = async () => {
    const db = await storage.getDBConnection();

    const cryptos = await storage.getItems<Crypto>(db, storage.TABLES.CRYPTOS);
    const fiats = await storage.getItems<Fiat>(db, storage.TABLES.FIATS);

    showing.current = [storage.TABLES.CRYPTOS, storage.TABLES.FIATS];

    setList([...cryptos, ...fiats]);
  };

  const onSearch = async (text: string) => {
    const db = await storage.getDBConnection();

    let items: typeof list = [];

    if (showing.current.includes(storage.TABLES.CRYPTOS)) {
      const cryptos = await storage.getItems<Crypto>(
        db,
        storage.TABLES.CRYPTOS,
        [`id`, `name`, `symbol`],
        {
          name: [`${text}%`, `% ${text}%`],
          symbol: [`${text}%`],
        },
        `OR`
      );
      items = [...items, ...cryptos];
    }

    if (showing.current.includes(storage.TABLES.FIATS)) {
      const fiats = await storage.getItems<Fiat>(
        db,
        storage.TABLES.FIATS,
        [`id`, `name`, `symbol`, `code`],
        {
          name: [`${text}%`],
          symbol: [`${text}%`],
        },
        `OR`
      );
      items = [...items, ...fiats];
    }

    setList(items);
  };

  return {
    list,
    clearDatabase,
    insertToDatabase,
    populateCurrencyListA,
    populateCurrencyListB,
    populateCurrencyListAB,
    onSearch,
  };
};

export default useData;
export type { UseDataResult, Crypto, Fiat };
