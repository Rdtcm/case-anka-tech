// lista os ativos por cliente

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../../styles/Assets.module.css';
import api from '../../../lib/api';

interface Asset {
  id: number;
  assetName: string;
  value: number;
  clientId: number;
}

export default function ClientAssetsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchAssets();
    }
  }, [id]);

  const fetchAssets = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/clients/${id}/assets`);
      setAssets(response.data);
    } catch (err) {
      console.error('Erro ao buscar ativos:', err);
      setError('Falha ao carregar ativos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (assetId: number) => {
    try {
      await api.delete(`/assets/${assetId}`);
      setAssets(prev => prev.filter(asset => asset.id !== assetId));
    } catch (err) {
      console.error('Erro ao deletar ativo:', err);
      alert('Falha ao remover ativo.');
    }
  };

  if (loading) return <p className={styles.noAssets}>Carregando ativos...</p>;
  if (error) return <p className={styles.noAssets}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ativos do Cliente {id}</h1>

      {assets.length === 0 ? (
        <p className={styles.noAssets}>Nenhum ativo encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome do Ativo</th>
              <th>Valor (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td className={styles.dataAssets}>{asset.assetName}</td>
                <td className={styles.dataAssets}>{asset.value.toFixed(2)}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(asset.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
