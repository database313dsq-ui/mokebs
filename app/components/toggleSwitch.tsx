
import { FiCheck, FiX } from "react-icons/fi"; 

export default function EnhancedToggleSwitch({isEnable, setEnable}:{isEnable: boolean, setEnable: () => void}) {


  return (
    <label className="flex items-center space-x-3! cursor-pointer select-none">
      {/* نص الحالة */}
      <span className="text-sm font-medium text-text-main">
        {isEnable ? "تشغيل التصويت للمواكب" : "إيقاف التصويت للمواكب"}
      </span>

      {/* حاوية الزر */}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isEnable}
          onChange={setEnable}
        />
        
        {/* خلفية الزر المتكيفة */}
        <div
          className="w-16 h-9 rounded-full transition-colors duration-300 ease-in-out border"
          style={{
            backgroundColor: isEnable ? 'var(--accent-gold)' : 'var(--panel-bg)',
            borderColor: 'var(--glass-border)',
            boxShadow: 'var(--shadow)',
          }}
        />

        {/* الدائرة المتحركة وبداخلها الأيقونات */}
        <div
          className="absolute left-1 top-1 bg-white w-7 h-7 rounded-full transition-transform duration-300 ease-in-out shadow-md flex items-center justify-center"
          style={{
            transform: isEnable ? "translateX(28px)" : "translateX(0px)",
          }}
        >
          {isEnable ? (
            // أيقونة حالة التشغيل (باللون الذهبي لتوحيد الهوية البصرية)
            <FiCheck className="w-4 h-4 text-[var(--accent-gold)] transition-all" />
          ) : (
            // أيقونة حالة الإيقاف (باللون الأحمر الداكن الخاص بثيمك)
            <FiX className="w-4 h-4 text-[var(--accent-red)] transition-all" />
          )}
        </div>
      </div>
    </label>
  );
}