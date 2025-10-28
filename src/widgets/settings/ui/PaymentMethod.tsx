import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getListPaymentMethodsQueryOptions } from '@/entities/payment-method/getListPaymentMethodsQueryOptions';
import { AddButton } from '@/features/settings/ui/AddButton';
import { SettingsSharedList } from '@/features/settings/ui/SettingsSharedList';
import { Section } from '@/features/settings-default-management/ui/Section';
import {
  type CreatePMArgs,
  createPaymentMethod,
  getIssuerCatalog,
} from '@/shared/apis/paymentMethod';
import { Flex } from '@/shared/ui/flex/Flex';
import * as css from './PaymentMethod.css';

interface Props {
  ledgerId: string;
}

const PaymentMethod = ({ ledgerId }: Props) => {
  const { data: paymentMethods } = useQuery(
    getListPaymentMethodsQueryOptions(ledgerId)
  );
  const { mutate: mutateCreatePaymentMethod } = useMutation({
    mutationFn: ({
      p_name,
      p_type,
      p_brand_name,
      p_issuer_code,
    }: Pick<
      CreatePMArgs,
      'p_name' | 'p_type' | 'p_brand_name' | 'p_issuer_code'
    >) =>
      createPaymentMethod({
        p_ledger_id: ledgerId,
        p_name,
        p_type,
        p_brand_name,
        p_issuer_code,
      }),
  });
  const { data: issuerCatalog } = useQuery({
    queryKey: ['issuer-catalog'],
    queryFn: getIssuerCatalog,
  });

  const [selectedIssuerCode, setSelectedIssuerCode] = useState<string | null>(
    null
  );

  return (
    <Flex px="x10" py="x10" flex={1} className={css.base}>
      <Section title="거래 수단">
        <AddButton
          onClick={() => {
            mutateCreatePaymentMethod({
              p_name: '신용카드',
              p_type: 'credit_card',
              p_brand_name: '현대카드',
              p_issuer_code: selectedIssuerCode ?? '',
            });
          }}
        >
          추가하기
        </AddButton>

        <SettingsSharedList
          list={paymentMethods?.map((item) => ({
            id: item.id,
            label: item.name,
            thumbnailUrl: '',
          }))}
        />

        <ul>
          {issuerCatalog?.map((item) => (
            <label key={item.id}>
              <input
                type="radio"
                name="issuer"
                id={item.id}
                value={item.code}
                onChange={() => setSelectedIssuerCode(item.code)}
              />
              <div>
                <img src={item.logo_url ?? ''} alt={item.display_name} />
              </div>
            </label>
          ))}
        </ul>
      </Section>
    </Flex>
  );
};

export { PaymentMethod };
