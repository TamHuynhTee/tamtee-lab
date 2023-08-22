import { Form } from 'antd';
import React, { useEffect, useRef } from 'react';

type Props = {};

const ScanBarcode = (props: Props) => {
  const refBarcode = useRef<string>('');
  const refTiming = useRef<number[] | null>(null);

  useEffect(() => {
    const _scanBarCode = (e: KeyboardEvent) => {
      if (refTiming.current === null) {
        refTiming.current = [];
      }
      if (1) {
        if (e.key === 'Enter') {
          //   const end = performance.now();
          const regexBarcode = new RegExp(
            /Shift|Control|Meta|Enter|%|Backspace|\s/g
          ); // regex de loai bo cac ky tu khong hop le trong barcode
          if (refTiming.current) {
            const _arr = [];
            console.log(refTiming.current);
            for (let index = 0; index < refTiming.current.length; index++) {
              if (index === refTiming.current.length - 1) continue;
              const currentNumber = refTiming.current[index];
              const nextNumber = refTiming.current[index + 1] || currentNumber;
              _arr.push(nextNumber - currentNumber);
            }
            console.log(`file: index.tsx:28 => _arr:`, _arr);
            console.log(
              _arr.reduce((prev, curr, index, arr) => {
                if (index === arr.length - 1) {
                  return (prev + curr) / arr.length;
                }
                return prev + curr;
              }, 0)
            );
            refTiming.current = null;
          }
          // const flatten = flattenString(refBarcode.current);
          //   scanBarCode(
          //     internalOrder?.oldWarehouseId,`
          //     flatten.replaceAll(regexBarcode, '')
          //   );

          refBarcode.current = '';
        } else {
          refBarcode.current += e.key;
          refTiming.current.push(performance.now());
        }
      }
    };
    document.addEventListener('keydown', _scanBarCode, true);
    return () => {
      document.removeEventListener('keydown', _scanBarCode, true);
    };
  }, []);

  return (
    <div>
      <FormExample />
    </div>
  );
};

const FormExample = () => {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        // console.log('down', event);
        // console.log('evnent', event);
        //     if (specialKey === null) {
        //       callBackFn();
        //       return;
        //     }
        //     if (event[specialKey]) callBackFn();
        //     return;
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const ref = useRef<any>(null);

  return (
    <Form
      onFinish={(e) => {
        console.log(e);
      }}
      id="form"
    >
      Form
    </Form>
  );
};

export default ScanBarcode;
